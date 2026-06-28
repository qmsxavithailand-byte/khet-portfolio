"use client";

const VW = 480;
const VH = 752;
const CX = 200;
const NW = 196;
const NH = 44;
const NR = 10;
const LOOP_X = 418;

const PHASES = [
  { id: "csr",     y: 55,  icon: "📋", label: "CSR Input",       sub: "Customer Requirements",    color: "#0ea5e9", isGate: false },
  { id: "phase1",  y: 145, icon: "🗺️",  label: "Phase 1",         sub: "Plan & Define",            color: "#6366f1", isGate: false },
  { id: "phase2",  y: 235, icon: "🔧", label: "Phase 2",         sub: "Product Design & Dev",     color: "#818cf8", isGate: false },
  { id: "phase3",  y: 325, icon: "⚙️",  label: "Phase 3",         sub: "Process Design & Dev",     color: "#f59e0b", isGate: false },
  { id: "phase4",  y: 415, icon: "📐", label: "Phase 4",         sub: "Validation · PPAP",        color: "#22c55e", isGate: false },
  { id: "ppap",    y: 505, icon: "🏆", label: "PPAP Gate",       sub: "18 Elements · Sign-off",   color: "#00d4aa", isGate: true  },
  { id: "phase5",  y: 595, icon: "📊", label: "Phase 5",         sub: "SPC · 8D · Monitoring",   color: "#a855f7", isGate: false },
  { id: "lessons", y: 685, icon: "📚", label: "Lessons Learned", sub: "→ Continuous Improvement", color: "#fbbf24", isGate: false },
];

export default function IATFClosedLoopGraph() {
  const nodeRight = CX + NW / 2;
  const lastY = PHASES[PHASES.length - 1].y;
  const phase1Y = PHASES[1].y;
  const closedLoopPath = `M ${nodeRight},${lastY} C ${LOOP_X},${lastY} ${LOOP_X},${phase1Y} ${nodeRight},${phase1Y}`;
  const loopLabelY = (lastY + phase1Y) / 2;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ width: "100%", maxWidth: `${VW}px`, display: "block", margin: "0 auto" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="iatf-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Vertical edges */}
        {PHASES.slice(0, -1).map((p, i) => {
          const next = PHASES[i + 1];
          const y1 = p.y + NH / 2 + 2;
          const y2 = next.y - NH / 2 - 2;
          const edgePath = `M ${CX},${y1} L ${CX},${y2}`;
          return (
            <g key={`edge-${p.id}`}>
              <line x1={CX} y1={y1} x2={CX} y2={y2}
                stroke={next.color} strokeWidth="1.5" strokeOpacity="0.4" />
              <polygon
                points={`${CX - 4},${y2 - 2} ${CX + 4},${y2 - 2} ${CX},${y2 + 6}`}
                fill={next.color} fillOpacity="0.7"
              />
              <circle r="2.5" fill={p.color} fillOpacity="0.9" filter="url(#iatf-glow)">
                <animateMotion
                  dur={`${2 + i * 0.15}s`}
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                  path={edgePath}
                />
              </circle>
            </g>
          );
        })}

        {/* Closed loop arc */}
        <path
          d={closedLoopPath}
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1.5"
          strokeDasharray="6,4"
          strokeOpacity="0.65"
        />
        {/* Arrowhead — pointing left into Phase 1 right edge */}
        <polygon
          points={`${nodeRight},${phase1Y} ${nodeRight + 8},${phase1Y - 4} ${nodeRight + 8},${phase1Y + 4}`}
          fill="#fbbf24" fillOpacity="0.75"
        />
        {/* Loop label (rotated) */}
        <text
          x={LOOP_X + 14}
          y={loopLabelY}
          fontSize="7.5"
          fill="#fbbf24"
          fillOpacity="0.65"
          textAnchor="middle"
          transform={`rotate(-90, ${LOOP_X + 14}, ${loopLabelY})`}
        >
          Closed Loop · Continuous Improvement
        </text>
        {/* Animated dot on closed loop */}
        <circle r="2.5" fill="#fbbf24" fillOpacity="0.9" filter="url(#iatf-glow)">
          <animateMotion dur="8s" repeatCount="indefinite" path={closedLoopPath} />
        </circle>

        {/* Phase nodes */}
        {PHASES.map((p) => {
          const left = CX - NW / 2;
          const top = p.y - NH / 2;
          const iconCX = left + 21;
          const textX = left + 40;

          return (
            <g key={p.id}>
              {/* Glow halo */}
              <rect
                x={left - 4} y={top - 4}
                width={NW + 8} height={NH + 8}
                rx={NR + 4}
                fill={p.color} fillOpacity="0.05"
                filter="url(#iatf-glow)"
              />
              {/* Node body */}
              <rect
                x={left} y={top}
                width={NW} height={NH}
                rx={NR}
                fill={p.color}
                fillOpacity={p.isGate ? 0.18 : 0.1}
                stroke={p.color}
                strokeWidth={p.isGate ? 1.5 : 1}
                strokeOpacity={p.isGate ? 0.85 : 0.45}
              />
              {/* Icon bg */}
              <circle cx={iconCX} cy={p.y} r={13} fill={p.color} fillOpacity="0.22" />
              {/* Icon */}
              <text x={iconCX} y={p.y + 4} textAnchor="middle" fontSize="11">{p.icon}</text>
              {/* Label */}
              <text x={textX} y={p.y - 5} fontSize="9.5" fontWeight="bold" fill={p.color}>{p.label}</text>
              {/* Sub */}
              <text x={textX} y={p.y + 8.5} fontSize="8" fill="#64748b">{p.sub}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
