"use client";
import Navbar from "@/components/Navbar";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";

const esdImages = [
  "/screenshots/esd/1.png",
  "/screenshots/esd/2.png",
  "/screenshots/esd/3.png",
  "/screenshots/esd/4.png",
  "/screenshots/esd/5.png",
];

const esdSteps = [
  { icon: "📋", label: "IPQA Form", sub: "IPQA fills digital<br/>ESD report", color: "rgba(99,102,241,0.15)", border: "#4f46e5" },
  { icon: "🔐", label: "GAS Auth", sub: "HMAC-SHA256<br/>token verify", color: "rgba(245,158,11,0.1)", border: "#d97706" },
  { icon: "📧", label: "Email Notify", sub: "Auto-email to<br/>Director", color: "rgba(14,165,233,0.1)", border: "#0284c7" },
  { icon: "✅", label: "Director<br/>Approve", sub: "One-click approve<br/>via deep link", color: "rgba(0,212,170,0.1)", border: "#00d4aa" },
  { icon: "📊", label: "Google Sheets", sub: "Auto-record to<br/>audit trail DB", color: "rgba(34,197,94,0.1)", border: "#16a34a" },
  { icon: "🗂️", label: "Records", sub: "Filter / Export<br/>audit-ready", color: "rgba(168,85,247,0.1)", border: "#9333ea" },
];

const features = [
  { icon: "🔒", title: "RBAC Authentication", desc: "13 roles, granular permissions. HMAC-SHA256, CSRF protection, 6-hour session watchdog." },
  { icon: "📧", title: "Email Automation", desc: "Auto-notify Director for ESD approval with deep-link routing — no re-login required." },
  { icon: "📊", title: "Google Sheets Backend", desc: "15+ sheet tabs as database. Full audit trail with timestamp and user identity on every write." },
  { icon: "🔗", title: "Deep Link Navigation", desc: "Email links open directly to approval pages — Director approves in one click." },
  { icon: "🗂️", title: "Filter & Export Records", desc: "Search and filter ESD records by date, line, or inspector — export audit-ready reports." },
  { icon: "⚙️", title: "Zero Infrastructure Cost", desc: "Runs 100% on Google Workspace — no server fees, auto-scales with Google infrastructure." },
];

export default function ESDPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden px-8 pt-16 pb-10" style={{ background: "transparent" }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,170,0.3)] bg-[rgba(0,212,170,0.08)] px-3 py-1 text-[11px] text-[#00d4aa]">
              <span className="live-dot h-2 w-2 rounded-full bg-[#00d4aa] inline-block" />
              Live — Production
            </div>
            <h1 className="mb-3 text-4xl font-extrabold text-white leading-tight">ESD Control System</h1>
            <p className="mb-4 text-sm text-[#64748b] leading-relaxed max-w-xl">
              Digital IPQA reporting system replacing 100% paper-based ESD inspection forms.
              RBAC-based approval workflow, email notifications, and full audit trail — built on Google Apps Script.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Google Apps Script", "Google Sheets", "Google Drive", "HMAC-SHA256", "RBAC · 13 Roles", "Email Automation"].map((t) => (
                <span key={t} className="rounded-lg bg-[#111827] border border-[#1e2d4a] px-3 py-1 text-xs text-[#94a3b8]">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <ScreenshotCarousel
            images={esdImages}
            browserLabel="script.google.com · Xavi Quality Management System — ESD Control System"
          />
        </div>
      </section>

      {/* ESD WORKFLOW */}
      <section className="border-t border-[#1e2d4a] py-16" style={{ background: "transparent" }}>
        <div className="mx-auto max-w-5xl px-8">
          <div className="rounded-xl border border-[#1e2d4a] bg-[#0d1520] px-6 py-6">
            <div className="mb-1 text-[10px] uppercase tracking-widest text-[#00d4aa]">// ESD System Workflow</div>
            <h3 className="mb-2 text-xl font-bold text-[#f1f5f9]">Inspection → Approval → Record Pipeline</h3>
            <p className="mb-8 text-xs text-[#475569]">6-step closed-loop — form submission to Google Sheets audit trail</p>
            <div className="flex justify-center overflow-x-auto pb-4">
              <WorkflowSteps steps={esdSteps} />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-[#1e2d4a] py-20" style={{ background: "rgba(6,9,26,0.6)" }}>
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-2 text-[10px] uppercase tracking-widest text-[#00d4aa]">// System Features</div>
          <h3 className="mb-10 text-xl font-bold text-[#f1f5f9]">ESD System Capabilities</h3>
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

function WorkflowSteps({ steps }: { steps: typeof esdSteps }) {
  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between w-full px-8">
        {steps.map((step, i) => (
          <div key={i} className="relative flex items-center flex-1">
            {i < steps.length - 1 && (
              <div className="absolute left-[calc(50%+28px)] right-[calc(-50%+28px)] top-7 h-px z-0"
                style={{ background: "linear-gradient(90deg, rgba(0,212,170,0.6), rgba(103,232,249,0.3))" }}>
                <div className="absolute top-[-2px] w-1.5 h-1.5 rounded-full bg-[#00d4aa]"
                  style={{
                    animation: `travel-${i} 2.5s linear infinite`,
                    animationDelay: `${i * 0.4}s`,
                    boxShadow: "0 0 6px #00d4aa",
                  }}
                />
              </div>
            )}
            <div className="flex flex-col items-center z-10 flex-1">
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-full opacity-30 blur-md"
                  style={{ background: step.border, transform: "scale(1.6)" }} />
                <div className="relative w-14 h-14 rounded-full flex items-center justify-center text-xl border-2 z-10"
                  style={{
                    background: step.color,
                    borderColor: step.border,
                    boxShadow: `0 0 16px ${step.border}60, 0 0 32px ${step.border}20`,
                  }}>
                  {step.icon}
                </div>
                <div className="absolute inset-0 rounded-full border opacity-0"
                  style={{
                    borderColor: step.border,
                    animation: `pulse-ring 2.5s ease-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }} />
              </div>
              <div className="text-xs font-semibold text-center leading-tight mb-1"
                style={{ color: step.border }}
                dangerouslySetInnerHTML={{ __html: step.label }} />
              <div className="text-[10px] text-[#475569] text-center leading-tight"
                dangerouslySetInnerHTML={{ __html: step.sub }} />
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2); opacity: 0; }
        }
        ${[0,1,2,3,4].map(i => `
          @keyframes travel-${i} {
            0% { left: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
        `).join('')}
      `}</style>
    </div>
  );
}
