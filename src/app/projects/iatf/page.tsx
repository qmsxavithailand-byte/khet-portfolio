"use client";
import Navbar from "@/components/Navbar";

const pipeline = [
  { icon: "📐", label: "APQP", sub: "Advanced Product Quality Planning", color: "rgba(99,102,241,0.15)", border: "#6366f1" },
  { icon: "📄", label: "PPAP", sub: "Production Part Approval Process", color: "rgba(14,165,233,0.1)", border: "#0ea5e9" },
  { icon: "⚠️", label: "PFMEA", sub: "Process Failure Mode & Effects Analysis", color: "rgba(245,158,11,0.1)", border: "#f59e0b" },
  { icon: "📋", label: "Control Plan", sub: "Process Control & Monitoring", color: "rgba(0,212,170,0.1)", border: "#00d4aa" },
  { icon: "📏", label: "MSA", sub: "Measurement System Analysis", color: "rgba(168,85,247,0.1)", border: "#a855f7" },
  { icon: "📈", label: "SPC", sub: "Statistical Process Control", color: "rgba(34,197,94,0.1)", border: "#22c55e" },
];

const planned = [
  { icon: "🔔", title: "Deadline Reminders", desc: "Auto-email reminders for APQP milestone deadlines and PPAP submission due dates." },
  { icon: "🔗", title: "Closed-Loop Traceability", desc: "Full traceability from APQP plan → PFMEA risk → Control Plan action → SPC monitoring." },
  { icon: "📊", title: "Audit-Ready Reports", desc: "Auto-generated IATF 16949 core tool reports ready for customer and third-party audits." },
  { icon: "✅", title: "Approval Workflow", desc: "Multi-level approval chain for PPAP submissions with status tracking per element." },
  { icon: "📉", title: "Cpk / GR&R Dashboard", desc: "Real-time SPC charts with Cpk, Ppk, and GR&R results — colour-coded by acceptance criteria." },
  { icon: "🗂️", title: "Document Version Control", desc: "Control Plan and PFMEA version history with change tracking and revision log." },
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
              Automated APQP → PPAP → PFMEA → Control Plan → MSA → SPC pipeline with deadline
              reminders, traceability, and audit-ready reporting — built on Next.js + Google Workspace.
            </p>
            <div className="flex flex-wrap gap-2">
              {["APQP", "PPAP", "PFMEA", "Control Plan", "MSA", "SPC", "Next.js", "Google Sheets"].map((t) => (
                <span key={t} className="rounded-lg bg-[#111827] border border-[#1e2d4a] px-3 py-1 text-xs text-[#94a3b8]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* In Dev notice */}
          <div className="rounded-xl border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.05)] px-6 py-5 flex items-start gap-4">
            <div className="text-2xl mt-0.5">⚙️</div>
            <div>
              <div className="text-sm font-semibold text-[#f59e0b] mb-1">Currently in active development</div>
              <div className="text-xs text-[#64748b] leading-relaxed">
                This system is being built to digitize IATF 16949 core tools at XAVi Technologies.
                Screenshots and live demo will be available upon production release.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="border-t border-[#1e2d4a] py-16" style={{ background: "transparent" }}>
        <div className="mx-auto max-w-5xl px-8">
          <div className="rounded-xl border border-[#1e2d4a] bg-[#0d1520] px-6 py-6">
            <div className="mb-1 text-[10px] uppercase tracking-widest text-[#00d4aa]">// IATF 16949 Core Tools Pipeline</div>
            <h3 className="mb-8 text-xl font-bold text-[#f1f5f9]">APQP → PPAP → PFMEA → Control Plan → MSA → SPC</h3>
            <div className="grid grid-cols-6 gap-3">
              {pipeline.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full opacity-20 blur-md"
                      style={{ background: step.border, transform: "scale(1.5)" }} />
                    <div className="relative w-14 h-14 rounded-full flex items-center justify-center text-xl border-2"
                      style={{ background: step.color, borderColor: step.border, boxShadow: `0 0 16px ${step.border}40` }}>
                      {step.icon}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-center" style={{ color: step.border }}>{step.label}</div>
                  <div className="text-[10px] text-[#475569] text-center leading-tight">{step.sub}</div>
                  {i < pipeline.length - 1 && (
                    <div className="hidden" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#475569]">
              <div className="h-px w-12 bg-[#1e2d4a]" />
              Closed-loop traceability across all 6 core tools
              <div className="h-px w-12 bg-[#1e2d4a]" />
            </div>
          </div>
        </div>
      </section>

      {/* PLANNED FEATURES */}
      <section className="border-t border-[#1e2d4a] py-20" style={{ background: "rgba(6,9,26,0.6)" }}>
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-[#00d4aa]">// Planned Features</div>
          <h3 className="mb-10 text-xl font-bold text-[#f1f5f9]">What This System Will Do</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {planned.map((f) => (
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
