"use client";
import Navbar from "@/components/Navbar";
import IATFClosedLoopGraph from "@/components/IATFClosedLoopGraph";

const kpis = [
  { value: "≥ 95%",  label: "PPAP First-Pass Target",  color: "#00d4aa" },
  { value: "≥ 1.67", label: "Cpk Critical Chars.",     color: "#22c55e" },
  { value: "≤ 30d",  label: "8D Closure Target",       color: "#f59e0b" },
  { value: "18",     label: "PPAP Elements Tracked",   color: "#6366f1" },
];

const apqpPhases = [
  {
    phase: "Phase 1",
    name: "Plan & Define",
    color: "#6366f1",
    icon: "🗺️",
    deliverables: [
      "CSR Analysis & Feasibility",
      "Design Goals & Quality Targets",
      "Quality Program Plan",
      "APQP Team & Responsibilities",
      "Customer Input Requirements",
    ],
  },
  {
    phase: "Phase 2",
    name: "Product Design & Dev",
    color: "#818cf8",
    icon: "🔧",
    deliverables: [
      "DFMEA (Design FMEA)",
      "Design Verification Plan (DVP)",
      "Material & Tolerance Specs",
      "Prototype Build & Test",
      "Engineering Change Control",
    ],
  },
  {
    phase: "Phase 3",
    name: "Process Design & Dev",
    color: "#f59e0b",
    icon: "⚙️",
    deliverables: [
      "Process Flow Diagram",
      "PFMEA (Process FMEA)",
      "Pre-launch Control Plan",
      "MSA Study Plan",
      "Process Instructions (OI/WI)",
    ],
  },
  {
    phase: "Phase 4",
    name: "Validation",
    color: "#22c55e",
    icon: "📐",
    deliverables: [
      "Production Trial Run",
      "MSA / GR&R Study (≤ 30%)",
      "Initial Cpk Study (≥ 1.33)",
      "Production Control Plan",
      "PPAP Level 3 Submission",
    ],
  },
  {
    phase: "PPAP Gate",
    name: "Customer Approval",
    color: "#00d4aa",
    icon: "🏆",
    deliverables: [
      "Part Submission Warrant (PSW)",
      "All 18 PPAP Elements",
      "Customer Dimensional Report",
      "Material Cert & Performance",
      "→ Mass Production Release",
    ],
  },
  {
    phase: "Phase 5",
    name: "Monitoring & CA",
    color: "#a855f7",
    icon: "📊",
    deliverables: [
      "SPC Charts per Characteristic",
      "8D Corrective Action (≤ 30d)",
      "PPM / Warranty Tracking",
      "PFMEA → Control Plan Update",
      "Lessons Learned KB Entry",
    ],
  },
];

const features = [
  {
    icon: "🔗",
    title: "CSR-to-PPAP Traceability",
    desc: "Every PPAP element linked to its customer requirement — full audit-ready trail from CSR intake to production sign-off.",
  },
  {
    icon: "⚡",
    title: "PFMEA ↔ Control Plan Sync",
    desc: "Risk items in PFMEA auto-generate control actions in the Control Plan — no manual re-entry, no version drift.",
  },
  {
    icon: "📊",
    title: "SPC Dashboard",
    desc: "Real-time Cpk/Ppk charts per characteristic, colour-coded against acceptance criteria (Cpk ≥ 1.33 / ≥ 1.67 critical).",
  },
  {
    icon: "🔔",
    title: "APQP Gate Reminders",
    desc: "Auto-email alerts for APQP milestone deadlines and PPAP submission due dates sent to responsible owners.",
  },
  {
    icon: "🔄",
    title: "8D ↔ PFMEA Feedback Loop",
    desc: "Customer complaints trigger 8D workflow and auto-update PFMEA RPN — closing the quality loop systematically.",
  },
  {
    icon: "📋",
    title: "Audit-Ready Export",
    desc: "One-click export of the full APQP/PPAP package in IATF 16949 format, ready for customer and third-party audits.",
  },
];

export default function IATFPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden px-8 pt-16 pb-10" style={{ background: "transparent" }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(245,158,11,0.4)] bg-[rgba(245,158,11,0.08)] px-3 py-1 text-[11px] text-[#f59e0b]">
              <span className="h-2 w-2 rounded-full bg-[#f59e0b] inline-block animate-pulse" />
              In Development
            </div>
            <h1 className="mb-3 text-4xl font-extrabold text-white leading-tight">
              IATF 16949 Closed-Loop System
            </h1>
            <p className="mb-4 text-sm text-[#64748b] leading-relaxed max-w-xl">
              End-to-end APQP → PPAP → SPC pipeline with closed-loop corrective action feedback.
              Designed to digitize IATF 16949 core tools at XAVi Technologies — from customer
              requirements to production monitoring, all linked in a single traceable system.
            </p>
            <div className="flex flex-wrap gap-2">
              {["APQP", "PPAP", "PFMEA", "Control Plan", "MSA / GR&R", "SPC", "8D", "Next.js", "Google Sheets"].map((t) => (
                <span key={t} className="rounded-lg bg-[#111827] border border-[#1e2d4a] px-3 py-1 text-xs text-[#94a3b8]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.04)] px-5 py-4 flex items-center gap-4">
            <div className="text-xl">⚙️</div>
            <div className="text-xs text-[#64748b] leading-relaxed">
              <span className="text-[#f59e0b] font-semibold">Currently in active development</span>
              {" "}— architecture and workflow designed per IATF 16949:2016 APQP manual.
              Live demo available upon production release.
            </div>
          </div>
        </div>
      </section>

      {/* KPI TARGETS */}
      <section className="border-t border-[#1e2d4a] py-10" style={{ background: "transparent" }}>
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-3 text-[10px] uppercase tracking-widest text-[#00d4aa]">// Design Targets</div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-xl border border-[#1e2d4a] bg-[#0d1520] px-5 py-5 text-center">
                <div className="text-2xl font-extrabold mb-1" style={{ color: k.color }}>{k.value}</div>
                <div className="text-[10px] text-[#64748b] leading-snug">{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSED-LOOP DIAGRAM */}
      <section className="border-t border-[#1e2d4a] py-16" style={{ background: "transparent" }}>
        <div className="mx-auto max-w-5xl px-8">
          <div className="rounded-xl border border-[#1e2d4a] bg-[#0d1520] px-6 py-6">
            <div className="mb-1 text-[10px] uppercase tracking-widest text-[#00d4aa]">// IATF 16949 Closed-Loop Workflow</div>
            <h3 className="mb-6 text-xl font-bold text-[#f1f5f9]">CSR → APQP → PPAP → Production → Feedback Loop</h3>
            <IATFClosedLoopGraph />
          </div>
        </div>
      </section>

      {/* APQP PHASE CARDS */}
      <section className="border-t border-[#1e2d4a] py-20" style={{ background: "rgba(6,9,26,0.6)" }}>
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-[#00d4aa]">// APQP Phases & Deliverables</div>
          <h3 className="mb-10 text-xl font-bold text-[#f1f5f9]">What Each Gate Produces</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apqpPhases.map((p) => (
              <div
                key={p.phase}
                className="rounded-xl bg-[#0d1520] p-5"
                style={{ border: `1px solid ${p.color}30` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-lg"
                    style={{ background: `${p.color}18`, border: `1px solid ${p.color}40` }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: p.color }}>
                      {p.phase}
                    </div>
                    <div className="text-sm font-semibold text-[#f1f5f9]">{p.name}</div>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {p.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-xs text-[#64748b]">
                      <span className="mt-0.5 shrink-0" style={{ color: p.color }}>›</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM FEATURES */}
      <section className="border-t border-[#1e2d4a] py-20" style={{ background: "transparent" }}>
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-[#00d4aa]">// System Features</div>
          <h3 className="mb-10 text-xl font-bold text-[#f1f5f9]">What This System Does</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-[#1e2d4a] bg-[#111827] p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e2d4a] text-xl">
                  {f.icon}
                </div>
                <div className="mb-2 text-sm font-semibold text-[#f1f5f9]">{f.title}</div>
                <div className="text-xs text-[#64748b] leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1e2d4a] py-8 text-center text-xs text-[#334155]">
        <a href="https://phatcharaphon.vercel.app" className="text-[#00d4aa] hover:underline" target="_blank">
          phatcharaphon.vercel.app
        </a>
        {" · "}Built with Next.js &amp; Tailwind CSS
      </footer>
    </>
  );
}
