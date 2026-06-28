"use client";
import { useEffect, useRef } from "react";

type NodeType = "start" | "action" | "decision" | "notify" | "end" | "warning";

interface WNode { id: string; x: number; y: number; icon: string; label: string; type: NodeType; }
interface WEdge { from: string; to: string; label?: string; color?: string; dashed?: boolean; }

const VW = 1050;
const VH = 470;
const R = 24;

const NODES: WNode[] = [
  /* main flow y=85 */
  { id: "reporter",    x: 60,  y: 85,  icon: "👷", label: "Reporter",          type: "start"    },
  { id: "finding",     x: 190, y: 85,  icon: "📋", label: "Fill Finding",       type: "action"   },
  { id: "email_open",  x: 335, y: 85,  icon: "📧", label: "Email To+CC",        type: "notify"   },
  { id: "corrective",  x: 480, y: 85,  icon: "✏️", label: "Corrective Action",  type: "action"   },
  { id: "email_dir",   x: 635, y: 85,  icon: "📧", label: "Email Director",     type: "notify"   },
  { id: "director",    x: 800, y: 85,  icon: "⚖️", label: "Director",           type: "decision" },
  { id: "closed",      x: 960, y: 85,  icon: "✅", label: "Closed",             type: "end"      },
  /* reject branch y=215 */
  { id: "rejected",    x: 800, y: 215, icon: "❌", label: "Rejected",           type: "warning"  },
  { id: "revise",      x: 480, y: 215, icon: "✏️", label: "Revise & Resubmit",  type: "action"   },
  /* background reminder y=335 */
  { id: "act_remind",  x: 335, y: 335, icon: "⏰", label: "Action Reminder",    type: "notify"   },
  { id: "appr_remind", x: 635, y: 335, icon: "🔔", label: "Approval Reminder",  type: "notify"   },
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
  { from: "reporter",   to: "finding"                                                 },
  { from: "finding",    to: "email_open",  label: "Submit",    color: "#0ea5e9"       },
  { from: "email_open", to: "corrective",  label: "Open",      color: "#22c55e"       },
  { from: "corrective", to: "email_dir",   label: "Submit",    color: "#0ea5e9"       },
  { from: "email_dir",  to: "director",    label: "Action",    color: "#f59e0b"       },
  { from: "director",   to: "closed",      label: "Approve",   color: "#22c55e"       },
  /* reject branch */
  { from: "director",   to: "rejected",    label: "Reject",    color: "#ef4444"       },
  { from: "rejected",   to: "revise",                          color: "#ef4444"       },
  { from: "revise",     to: "corrective",  label: "Resubmit",  color: "#f59e0b", dashed: true },
  /* reminder — background cron (daily 23:30) */
  { from: "act_remind",  to: "email_open", label: "2·5·7d",   color: "#f59e0b", dashed: true },
  { from: "appr_remind", to: "email_dir",  label: "2·5·7d",   color: "#a855f7", dashed: true },
];

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
  return `M ${x1 + ux * R} ${y1 + uy * R} L ${x2 - ux * R} ${y2 - uy * R}`;
}

function midPt(e: WEdge): [number, number] {
  const [x1, y1] = center(e.from);
  const [x2, y2] = center(e.to);
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

export default function ESDWorkflowGraph() {
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
        const pos = path.getPointAtLength(((t + i * 0.1) % 1) * len);
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
      <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ minWidth: 660 }}>
        <defs>
          {["#0ea5e9","#22c55e","#ef4444","#f59e0b","#a855f7","#6366f1"].map(c => (
            <marker key={c} id={`esd-arr-${c.slice(1)}`} markerWidth="7" markerHeight="7"
              refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill={c} />
            </marker>
          ))}
          <filter id="esd-glow">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* lane dividers */}
        {[150, 268].map((y, i) => (
          <line key={i} x1={30} y1={y} x2={VW - 10} y2={y}
            stroke="#1e2d4a" strokeWidth="1" strokeDasharray="4 6" />
        ))}

        {/* lane labels */}
        <text x={14} y={85}  fontSize="7" fill="#334155" dominantBaseline="middle" transform="rotate(-90,14,85)">Main Flow</text>
        <text x={14} y={215} fontSize="7" fill="#334155" dominantBaseline="middle" transform="rotate(-90,14,215)">Reject</text>
        <text x={14} y={335} fontSize="7" fill="#334155" dominantBaseline="middle" transform="rotate(-90,14,335)">Reminder</text>

        {/* Edges */}
        {EDGES.map((e, i) => {
          const col = e.color ?? "#0ea5e9";
          const d = buildPath(e);
          const [mx, my] = midPt(e);
          return (
            <g key={i}>
              <path className="fp" d={d} fill="none"
                stroke={col} strokeWidth="1.5" strokeOpacity="0.7"
                strokeDasharray={e.dashed ? "5 4" : undefined}
                markerEnd={`url(#esd-arr-${col.slice(1)})`} />
              <circle className="pk" r="2.5" fill={col} opacity="0.85"
                style={{ filter: `drop-shadow(0 0 3px ${col})` }} />
              {e.label && (
                <text x={mx} y={my - 6} textAnchor="middle"
                  fontSize="7.5" fill={col} fontWeight="700" opacity="0.9">
                  {e.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map(n => {
          const { bg, border } = TYPE_COLOR[n.type];
          const isDiamond = n.type === "decision";
          return (
            <g key={n.id} filter="url(#esd-glow)">
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
              <text x={n.x} y={n.y+1} textAnchor="middle" dominantBaseline="middle"
                fontSize={isDiamond ? "13" : "14"}>
                {n.icon}
              </text>
              {(() => {
                const words = n.label.split(" ");
                const lines: string[] = [];
                let cur = "";
                for (const w of words) {
                  if ((cur + " " + w).trim().length > 14 && cur) { lines.push(cur.trim()); cur = w; }
                  else { cur = (cur + " " + w).trim(); }
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
        {/* Escalation rules — reminder lane */}
        {[
          { x: 311, color: "#f59e0b", lines: ["Level 1 · 2d → To (ผู้รับผิดชอบ)", "Level 2 · 5d → + Manager", "Level 3 · 7d → + ESD Director"] },
          { x: 611, color: "#a855f7", lines: ["Level 1 · 2d → ESD Director", "Level 2 · 5d → ESD Director", "Level 3 · 7d → ESD Director"] },
        ].map((block, bi) => (
          <g key={bi}>
            {block.lines.map((line, li) => (
              <text key={li} x={block.x} y={408 + li * 13}
                textAnchor="start" fontSize="7.5" fill={block.color} opacity="0.75">
                {line}
              </text>
            ))}
          </g>
        ))}
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
