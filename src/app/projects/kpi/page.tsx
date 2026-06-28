"use client";
import Navbar from "@/components/Navbar";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import KPIWorkflowGraph from "@/components/KPIWorkflowGraph";

const kpiImages = [
  "/screenshots/kpi/1.png",
  "/screenshots/kpi/2.png",
  "/screenshots/kpi/3.png",
  "/screenshots/kpi/4.png",
  "/screenshots/kpi/5.png",
  "/screenshots/kpi/6.png",
  "/screenshots/kpi/7.png",
  "/screenshots/kpi/8.png",
  "/screenshots/kpi/9.png",
  "/screenshots/kpi/10.png",
  "/screenshots/kpi/11.png",
  "/screenshots/kpi/12.png",
  "/screenshots/kpi/13.png",
];

const features = [
  { icon: "📝", title: "Multi-KPI Submission", desc: "Preparer submits multiple KPIs per department per month via structured form with target, actual, and unit fields." },
  { icon: "✅", title: "Manager Approval Queue", desc: "Email deep-link routing sends approval requests directly to managers — one-click approve or reject." },
  { icon: "📊", title: "QMR Matrix View", desc: "QMR monitors all departments in a matrix view (dept × month) to track submission and approval status." },
  { icon: "📈", title: "Real-time Dashboard", desc: "Chart.js bar and line charts visualize KPI trends per department with colour-coded performance indicators." },
  { icon: "📋", title: "Management Review Report", desc: "Auto-generated ISO 9001 Management Review input — aggregates KPI data into report-ready format." },
  { icon: "🔄", title: "Change Request Workflow", desc: "KPI Change Request with full approval chain and history tracking per ISO 9001 clause 6.2 requirements." },
];

export default function KPIPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden px-8 pt-16 pb-10" style={{ background: "transparent" }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(14,165,233,0.3)] bg-[rgba(14,165,233,0.08)] px-3 py-1 text-[11px] text-[#0ea5e9]">
              <span className="live-dot h-2 w-2 rounded-full bg-[#00d4aa] inline-block" />
              Production Ready
            </div>
            <h1 className="mb-3 text-4xl font-extrabold text-white leading-tight">KPI Dashboard System</h1>
            <p className="mb-4 text-sm text-[#64748b] leading-relaxed max-w-xl">
              Multi-role KPI management — Preparer submits monthly KPIs, Manager approves, QMR monitors
              all departments via matrix view and real-time Chart.js dashboard.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Chart.js", "Google Sheets", "Multi-role RBAC", "Email Automation", "Management Review"].map((t) => (
                <span key={t} className="rounded-lg bg-[#111827] border border-[#1e2d4a] px-3 py-1 text-xs text-[#94a3b8]">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <ScreenshotCarousel
            images={kpiImages}
            browserLabel="script.google.com · Xavi Quality Management System — KPI Dashboard"
          />
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="border-t border-[#1e2d4a] py-16" style={{ background: "transparent" }}>
        <div className="mx-auto max-w-5xl px-8">
          <div className="rounded-xl border border-[#1e2d4a] bg-[#0d1520] px-6 py-6">
            <div className="mb-1 text-[10px] uppercase tracking-widest text-[#00d4aa]">// KPI System Workflow</div>
            <h3 className="mb-6 text-xl font-bold text-[#f1f5f9]">Submit → Approve → Monitor Pipeline</h3>
            <KPIWorkflowGraph />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-[#1e2d4a] py-20" style={{ background: "rgba(6,9,26,0.6)" }}>
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-[#00d4aa]">// System Features</div>
          <h3 className="mb-10 text-xl font-bold text-[#f1f5f9]">KPI System Capabilities</h3>
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
