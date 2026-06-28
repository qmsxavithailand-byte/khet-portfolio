"use client";
import { useEffect, useRef } from "react";

type NodeType = "start" | "action" | "decision" | "notify" | "end" | "warning";

interface WNode {
  id: string;
  x: number;
  y: number;
  icon: string;
  label: string;
  type: NodeType;
}

interface WEdge {
  from: string;
  to: string;
  label?: string;
  color?: string;
  dashed?: boolean;
  curveOffset?: number; // perpendicular bend amount
}

/* ── ViewBox 980 × 370 ── */
const VW = 980;
const VH = 370;
const R = 26;

/* ── Main pipeline: y=80, spaced evenly ── */
const NODES: WNode[] = [
  { id: "preparer",   x: 60,  y: 80,  icon: "📝", label: "Preparer",      type: "start" },
  { id: "submit",     x: 200, y: 80,  icon: "📤", label: "Submit KPI",    type: "action" },
  { id: "email_mgr",  x: 340, y: 80,  icon: "📧", label: "Email Manager", type: "notify" },
  { id: "mgr_decide", x: 490, y: 80,  icon: "⚖️", label: "Manager",       type: "decision" },
  { id: "approved",   x: 640, y: 80,  icon: "✅", label: "Approved",      type: "action" },
  { id: "qmr",        x: 780, y: 80,  icon: "📊", label: "QMR Monitor",   type: "action" },
  { id: "report",     x: 920, y: 80,  icon: "📋", label: "Management Review Report", type: "end" },

  /* ── Reject branch: directly below Manager (x=490) ── */
  { id: "rejected",   x: 490, y: 210, icon: "❌", label: "Rejected",          type: "warning" },
  { id: "email_rej",  x: 340, y: 210, icon: "📩", label: "Notify Preparer",   type: "notify" },
  { id: "revise",     x: 200, y: 210, icon: "✏️", label: "Revise & Resubmit", type: "action" },

  /* ── Reminder branch: y=310 (overdue under Manager, reminder aligns Preparer) ── */
  { id: "overdue",    x: 490, y: 310, icon: "⏰", label: "Overdue >48h",  type: "warning" },
  { id: "reminder",   x: 60,  y: 310, icon: "🔔", label: "Auto Reminder", type: "notify" },
];

const TYPE_COLOR: Record<NodeType, { bg: string; border: string }> = {
  start:    { bg: "rgba(99,102,241,0.18)",  border: "#6366f1" },
  action:   { bg: "rgba(14,165,233,0.12)",  border: "#0ea5e9" },
  decision: { bg: "rgba(245,158,11,0.15)",  border: "#f59e0b" },
  notify:   { bg: "rgba(168,85,247,0.12)",  border: "#a855f7" },
  end:      { bg: "rgba(34,197,94,0.14)",   border: "#22c55e" },
  warning:  { bg: "rgba(239,68,68,0.12)",   border: "#ef4444" },
};

const EDGES: WEdge[] = [
  /* main pipeline */
  { from: "preparer",   to: "submit" },
  { from: "submit",     to: "email_mgr" },
  { from: "email_mgr",  to: "mgr_decide" },
  { from: "mgr_decide", to: "approved",  label: "Approve", color: "#22c55e" },
  { from: "approved",   to: "qmr" },
  { from: "qmr",        to: "report" },

  /* reject branch */
  { from: "mgr_decide", to: "rejected",  label: "Reject",  color: "#ef4444" },
  { from: "rejected",   to: "email_rej" },
  { from: "email_rej",  to: "revise" },
  /* loopback revise → submit (straight up) */
  { from: "revise", to: "submit", label: "Resubmit", color: "#f59e0b", dashed: true },

  /* reminder branch */
  { from: "mgr_decide", to: "overdue",  label: ">48h",    color: "#ef4444", dashed: true },
  { from: "overdue",    to: "reminder",                    color: "#a855f7" },
  { from: "reminder",   to: "preparer", label: "Re-notify", color: "#a855f7", dashed: true },
];

/* ── helpers ── */
function center(id: string): [number, number] {
  const n = NODES.find(n => n.id === id)!;
  return [n.x, n.y];
}

function buildPath(e: WEdge): string {
  const [x1, y1] = center(e.from);
  const [x2, y2] = center(e.to);
  const dx = x2 - x1; const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / len; const uy = dy / len;

  if (!e.curveOffset) {
    return `M ${x1 + ux * R} ${y1 + uy * R} L ${x2 - ux * R} ${y2 - uy * R}`;
  }
  const off = e.curveOffset;
  const mx = (x1 + x2) / 2 + (-uy) * off;
  const my = (y1 + y2) / 2 + ux * off;
  // trim from node edge to control pt
  const dsx = mx - x1; const dsy = my - y1;
  const ls = Math.sqrt(dsx*dsx+dsy*dsy)||1;
  const sx = x1 + (dsx/ls)*R; const sy = y1 + (dsy/ls)*R;
  const dex = mx - x2; const dey = my - y2;
  const le = Math.sqrt(dex*dex+dey*dey)||1;
  const ex = x2 + (dex/le)*R; const ey = y2 + (dey/le)*R;
  return `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`;
}

function midPt(e: WEdge): [number, number] {
  const [x1, y1] = center(e.from);
  const [x2, y2] = center(e.to);
  if (!e.curveOffset) return [(x1+x2)/2, (y1+y2)/2];
  const off = e.curveOffset;
  const dx=x2-x1; const dy=y2-y1; const len=Math.sqrt(dx*dx+dy*dy)||1;
  const mx=(x1+x2)/2+(-dy/len)*off; const my=(y1+y2)/2+(dx/len)*off;
  return [0.25*x1+0.5*mx+0.25*x2, 0.25*y1+0.5*my+0.25*y2];
}

/* ── Component ── */
export default function KPIWorkflowGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf: number;
    let t = 0;
    function tick() {
      t = (t + 0.004) % 1;
      const svg = svgRef.current;
      if (!svg) return;
      const flowPaths = svg.querySelectorAll<SVGPathElement>(".fp");
      const packets   = svg.querySelectorAll<SVGCircleElement>(".pk");
      flowPaths.forEach((path, i) => {
        const pkt = packets[i];
        if (!pkt) return;
        const len = path.getTotalLength();
        const pos = path.getPointAtLength(((t + i * 0.09) % 1) * len);
        pkt.setAttribute("cx", String(pos.x));
        pkt.setAttribute("cy", String(pos.y));
      });
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ minWidth: 620 }}>
        <defs>
          {["#0ea5e9","#22c55e","#ef4444","#f59e0b","#a855f7","#6366f1"].map(c => (
            <marker key={c} id={`arr-${c.slice(1)}`} markerWidth="7" markerHeight="7"
              refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill={c} />
            </marker>
          ))}
          <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* row labels */}
        {/* lane guide lines */}
        {[148, 260].map((y, i) => (
          <line key={i} x1={30} y1={y} x2={VW - 10} y2={y}
            stroke="#1e2d4a" strokeWidth="1" strokeDasharray="4 6" />
        ))}

        {/* ── Edges ── */}
        {EDGES.map((e, i) => {
          const col = e.color ?? "#0ea5e9";
          const d = buildPath(e);
          const [mx, my] = midPt(e);
          return (
            <g key={i}>
              <path className="fp" d={d} fill="none"
                stroke={col} strokeWidth="1.5" strokeOpacity="0.7"
                strokeDasharray={e.dashed ? "5 4" : undefined}
                markerEnd={`url(#arr-${col.slice(1)})`} />
              <circle className="pk" r="2.5" fill={col} opacity="0.85"
                style={{ filter: `drop-shadow(0 0 3px ${col})` }} />
              {e.label && (
                <text x={mx} y={my - 5} textAnchor="middle"
                  fontSize="7.5" fill={col} fontWeight="700" opacity="0.9">
                  {e.label}
                </text>
              )}
            </g>
          );
        })}

        {/* ── Nodes ── */}
        {NODES.map(n => {
          const { bg, border } = TYPE_COLOR[n.type];
          const isDiamond = n.type === "decision";
          return (
            <g key={n.id} filter="url(#glow)">
              {/* glow halo */}
              <circle cx={n.x} cy={n.y} r={R + 8} fill={border} opacity="0.12" />

              {isDiamond ? (
                <polygon
                  points={`${n.x},${n.y-R-3} ${n.x+R+3},${n.y} ${n.x},${n.y+R+3} ${n.x-R-3},${n.y}`}
                  fill={bg} stroke={border} strokeWidth="1.5"
                  style={{ filter: `drop-shadow(0 0 6px ${border})` }}
                />
              ) : (
                <circle cx={n.x} cy={n.y} r={R} fill={bg} stroke={border} strokeWidth="1.5"
                  style={{ filter: `drop-shadow(0 0 6px ${border})` }}
                />
              )}

              {/* icon */}
              <text x={n.x} y={n.y+1} textAnchor="middle" dominantBaseline="middle"
                fontSize={isDiamond ? "13" : "14"}>
                {n.icon}
              </text>

              {/* label below node — wrap at 14 chars */}
              {(() => {
                const words = n.label.split(" ");
                const lines: string[] = [];
                let cur = "";
                for (const w of words) {
                  if ((cur + " " + w).trim().length > 14 && cur) {
                    lines.push(cur.trim());
                    cur = w;
                  } else {
                    cur = (cur + " " + w).trim();
                  }
                }
                if (cur) lines.push(cur.trim());
                return lines.map((line, li) => (
                  <text key={li} x={n.x} y={n.y + R + 13 + li * 10}
                    textAnchor="middle" fontSize="8.5" fontWeight="700" fill={border}>
                    {line}
                  </text>
                ));
              })()}
            </g>
          );
        })}
      </svg>

      {/* legend */}
      <div className="mt-3 flex flex-wrap gap-3 justify-center">
        {(Object.entries(TYPE_COLOR) as [NodeType, { bg: string; border: string }][]).map(([type, c]) => (
          <div key={type} className="flex items-center gap-1.5 text-[10px] text-[#64748b]">
            <div className="w-2 h-2 rounded-full" style={{ background: c.border }} />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        ))}
        <div className="flex items-center gap-1.5 text-[10px] text-[#64748b]">
          <div className="w-5 border-t border-dashed border-[#475569]" />
          Conditional
        </div>
      </div>
    </div>
  );
}
