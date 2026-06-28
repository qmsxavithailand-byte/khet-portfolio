import Link from "next/link";
import Navbar from "@/components/Navbar";
import { BarChart3, ShieldCheck, GitMerge } from "lucide-react";

const projects = [
  {
    slug: "kpi",
    Icon: BarChart3,
    iconColor: "#00d4aa",
    iconBg: "linear-gradient(135deg, rgba(0,212,170,0.18), rgba(14,165,233,0.1))",
    title: "KPI Dashboard System",
    desc: "Multi-role KPI management — Preparer submits, Manager approves, QMR monitors via matrix view, real-time Chart.js dashboard.",
    tags: ["Chart.js", "KPI", "ISO 9001", "Multi-role"],
    status: "Production Ready",
    statusColor: "text-[#0ea5e9] bg-[rgba(14,165,233,0.1)] border-[rgba(14,165,233,0.25)]",
  },
  {
    slug: "esd",
    Icon: ShieldCheck,
    iconColor: "#818cf8",
    iconBg: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.1))",
    title: "ESD Control System",
    desc: "Digital IPQA reporting — replaces 100% paper-based ESD inspection forms with approval workflow, email notifications, and full audit trail.",
    tags: ["Google Apps Script", "IPQA", "ESD Control", "RBAC"],
    status: "Production Ready",
    statusColor: "text-[#0ea5e9] bg-[rgba(14,165,233,0.1)] border-[rgba(14,165,233,0.25)]",
  },
  {
    slug: "iatf",
    Icon: GitMerge,
    iconColor: "#f59e0b",
    iconBg: "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(239,68,68,0.08))",
    title: "IATF 16949 Closed-Loop System",
    desc: "Automated APQP → PPAP → PFMEA → Control Plan → MSA → SPC pipeline with deadline reminders and audit-ready reporting.",
    tags: ["APQP", "PPAP", "FMEA", "SPC", "Next.js"],
    status: "In Dev",
    statusColor: "text-[#f59e0b] bg-[rgba(245,158,11,0.1)] border-[rgba(245,158,11,0.25)]",
  },
];

const auditTypes = ["IATF 16949", "ISO 9001", "ISO 14001", "ISO 45001", "UL", "ETL", "MET", "Customer"];
const isoStandards = ["IATF 16949:2016", "ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018"];
const systemsBuilt = ["KPI Dashboard", "ESD Control System", "IATF Closed-Loop ⚙️"];

const certs = [
  { label: "IATF 16949:2016 — Automotive QMS", file: "/CERTIFICATE/IATF16949 Certificate.pdf", icon: "🏆" },
  { label: "ISO 9001:2015 — Quality Management System", file: "/CERTIFICATE/ISO9001.pdf", icon: "📋" },
  { label: "ISO 14001 & 45001 — Environmental & OH&S", file: "/CERTIFICATE/Cer. ISO14001 and 45001.pdf", icon: "🌿" },
  { label: "APQP / PPAP / FMEA — Core Tools", file: "/CERTIFICATE/FMEA APQP PPAP.pdf", icon: "⚙️" },
  { label: "TOEIC Score Certificate", file: "/CERTIFICATE/TOEIC score.pdf", icon: "🌐" },
  { label: "จป. วิชาชีพ — Safety Officer", file: "/CERTIFICATE/จป.pdf", icon: "🦺" },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-6 pb-10 text-center"
        style={{ background: "transparent" }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,170,0.3)] bg-[rgba(0,212,170,0.08)] px-4 py-1.5 text-xs text-[#00d4aa] tracking-wider">
            ⚙️ QMS Engineer · IATF 16949 · ISO 9001/14001/45001
          </div>

          <h1
            className="mb-4 text-5xl font-extrabold leading-tight"
            style={{
              background: "linear-gradient(135deg,#fff 0%,#00d4aa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Phatcharaphon
            <br />
            Buapha
          </h1>
          <p className="hero-sub mb-3 text-lg text-[#94a3b8]">Quality Management Systems Engineer</p>
          <p className="hero-desc mb-6 text-sm text-[#94a3b8] leading-relaxed">
            Building intelligent QMS automation — combining IATF 16949 expertise with AI tools and
            full-stack development to digitize quality operations.
          </p>

        </div>

        {/* Stats */}
        <div className="relative z-10 mt-6 grid grid-cols-4 gap-3 w-full max-w-5xl">
          {/* Years */}
          <div
            className="rounded-xl px-6 py-4"
            style={{ background: "rgba(6,9,26,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,212,170,0.15)" }}
          >
            <div className="text-center mb-3">
              <div className="text-3xl font-extrabold text-[#00d4aa]" style={{ textShadow: "0 0 20px rgba(0,212,170,0.5)" }}>5+</div>
              <div className="mt-1 text-xs text-[#94a3b8]">Years QMS Experience</div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center border-t border-[#1e2d4a] pt-3">
              {["QMS Engineer", "Lead Auditor", "Document Control", "QMR"].map((t) => (
                <span key={t} className="rounded-full bg-[rgba(0,212,170,0.08)] border border-[rgba(0,212,170,0.2)] px-2 py-0.5 text-[10px] text-[#00d4aa]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ISO Standards */}
          <div
            className="rounded-xl px-6 py-4"
            style={{ background: "rgba(6,9,26,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,212,170,0.15)" }}
          >
            <div className="text-center mb-3">
              <div className="text-3xl font-extrabold text-[#00d4aa]" style={{ textShadow: "0 0 20px rgba(0,212,170,0.5)" }}>4</div>
              <div className="mt-1 text-xs text-[#94a3b8]">ISO/IATF Standards</div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center border-t border-[#1e2d4a] pt-3">
              {isoStandards.map((t) => (
                <span key={t} className="rounded-full bg-[rgba(0,212,170,0.08)] border border-[rgba(0,212,170,0.2)] px-2 py-0.5 text-[10px] text-[#00d4aa]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* QMS Systems */}
          <div
            className="rounded-xl px-6 py-4"
            style={{ background: "rgba(6,9,26,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,212,170,0.15)" }}
          >
            <div className="text-center mb-3">
              <div className="text-3xl font-extrabold text-[#00d4aa]" style={{ textShadow: "0 0 20px rgba(0,212,170,0.5)" }}>3</div>
              <div className="mt-1 text-xs text-[#94a3b8]">QMS Systems Built</div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center border-t border-[#1e2d4a] pt-3">
              {systemsBuilt.map((t) => (
                <span key={t} className="rounded-full bg-[rgba(0,212,170,0.08)] border border-[rgba(0,212,170,0.2)] px-2 py-0.5 text-[10px] text-[#00d4aa]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Audit combined card */}
          <div
            className="rounded-xl px-6 py-4"
            style={{ background: "rgba(6,9,26,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,212,170,0.15)" }}
          >
            <div className="flex gap-6 mb-3">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#00d4aa]" style={{ textShadow: "0 0 20px rgba(0,212,170,0.5)" }}>100+</div>
                <div className="mt-1 text-xs text-[#94a3b8]">Audits Conducted</div>
              </div>
              <div className="w-px bg-[#1e2d4a]" />
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#00d4aa]" style={{ textShadow: "0 0 20px rgba(0,212,170,0.5)" }}>8</div>
                <div className="mt-1 text-xs text-[#94a3b8]">Audit Types</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center border-t border-[#1e2d4a] pt-3">
              {auditTypes.map((t) => (
                <span key={t} className="rounded-full bg-[rgba(0,212,170,0.08)] border border-[rgba(0,212,170,0.2)] px-2 py-0.5 text-[10px] text-[#00d4aa]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-5xl px-8 py-24">
        <div className="mb-3 text-[10px] uppercase tracking-widest text-[#00d4aa]">// Projects</div>
        <h2 className="mb-12 text-2xl font-bold text-[#f1f5f9]">QMS Systems I&apos;ve Built</h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.title}
              href={`/projects/${p.slug}`}
              className="group relative rounded-xl border border-[#1e2d4a] bg-[#111827] p-6 hover:border-[#00d4aa] hover:-translate-y-1 transition-all duration-200"
            >
              <div
                className={`absolute top-4 right-4 rounded-full border text-[10px] px-2 py-0.5 ${p.statusColor}`}
              >
                {p.status}
              </div>
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: p.iconBg, boxShadow: `0 0 18px ${p.iconColor}30` }}
              >
                <p.Icon size={22} color={p.iconColor} strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 text-sm font-bold text-[#f1f5f9]">{p.title}</h3>
              <p className="mb-4 text-xs text-[#64748b] leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-[#1e2d4a] px-2 py-0.5 text-[10px] text-[#94a3b8]">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-[11px] text-[#00d4aa] group-hover:underline">View Details →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* KAIZEN */}
      <section id="kaizen" className="border-t border-[#1e2d4a] py-24" style={{ background: "rgba(6,9,26,0.7)" }}>
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-3 text-[10px] uppercase tracking-widest text-[#00d4aa]">// Kaizen Initiative</div>
          <h2 className="mb-2 text-2xl font-bold text-[#f1f5f9]">Paperless QMS — Cost Reduction</h2>
          <p className="mb-10 text-xs text-[#475569]">Replaced paper-based QMS inspection forms with digital records. Eliminated printing & procurement costs entirely.</p>

          {/* Cost formula row */}
          <div className="mb-6 rounded-xl border border-[#1e2d4a] bg-[#0d1520] px-6 py-5">
            <div className="mb-3 text-[10px] uppercase tracking-widest text-[#64748b]">Cost per Sheet (Before)</div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="rounded-lg bg-[#111827] border border-[#1e2d4a] px-4 py-2 text-center">
                <div className="text-xs text-[#64748b]">Paper/sheet</div>
                <div className="text-base font-bold text-[#f1f5f9]">฿0.238</div>
                <div className="text-[10px] text-[#475569]">595÷2,500 แผ่น</div>
              </div>
              <span className="text-[#334155] font-bold text-lg">+</span>
              <div className="rounded-lg bg-[#111827] border border-[#1e2d4a] px-4 py-2 text-center">
                <div className="text-xs text-[#64748b]">Print B&W/sheet</div>
                <div className="text-base font-bold text-[#f1f5f9]">฿0.25</div>
                <div className="text-[10px] text-[#475569]">ราคาพิมพ์ขาวดำ</div>
              </div>
              <span className="text-[#334155] font-bold text-lg">=</span>
              <div className="rounded-lg border border-[rgba(0,212,170,0.3)] bg-[rgba(0,212,170,0.06)] px-4 py-2 text-center">
                <div className="text-xs text-[#00d4aa]">รวม/แผ่น</div>
                <div className="text-base font-bold text-[#00d4aa]">฿0.488</div>
                <div className="text-[10px] text-[#475569]">ต่อ 1 แผ่น</div>
              </div>
              <span className="text-[#334155] font-bold text-lg">×</span>
              <div className="rounded-lg bg-[#111827] border border-[#1e2d4a] px-4 py-2 text-center">
                <div className="text-xs text-[#64748b]">25,000 แผ่น/เดือน</div>
                <div className="text-base font-bold text-[#f1f5f9]">10 ลัง</div>
                <div className="text-[10px] text-[#475569]">= 2,500×10</div>
              </div>
              <span className="text-[#334155] font-bold text-lg">=</span>
              <div className="rounded-lg border border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.06)] px-4 py-2 text-center">
                <div className="text-xs text-[#ef4444]">ค่าใช้จ่าย/เดือน</div>
                <div className="text-base font-bold text-[#ef4444]">฿12,200</div>
                <div className="text-[10px] text-[#475569]">กระดาษ+พิมพ์</div>
              </div>
            </div>
          </div>

          {/* GWS Investment row */}
          <div className="mb-6 rounded-xl border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.04)] px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">☁️</span>
                <div>
                  <div className="text-xs font-semibold text-[#6366f1]">Google Workspace Business Plus</div>
                  <div className="text-[10px] text-[#475569]">Phase 1 — QMS digital records (central users)</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-xs text-[#64748b]">ค่าใช้จ่าย/ปี</div>
                  <div className="text-base font-bold text-[#6366f1]">฿10,000</div>
                </div>
                <span className="text-[#334155] text-lg font-bold">vs</span>
                <div className="text-center">
                  <div className="text-xs text-[#64748b]">ประหยัดได้/ปี</div>
                  <div className="text-base font-bold text-[#00d4aa]">฿102,480</div>
                </div>
                <div className="rounded-lg border border-[rgba(245,158,11,0.4)] bg-[rgba(245,158,11,0.08)] px-4 py-2 text-center">
                  <div className="text-[10px] text-[#f59e0b]">ROI ปีแรก</div>
                  <div className="text-lg font-extrabold text-[#f59e0b]">924%</div>
                  <div className="text-[10px] text-[#475569]">92,480 ÷ 10,000</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="mb-6 grid grid-cols-5 gap-3">
            {[
              { label: "ค่าใช้จ่าย/เดือน", val: "฿12,200", sub: "ก่อนเปลี่ยนระบบ", color: "#ef4444" },
              { label: "ลด 70%/เดือน", val: "฿8,540", sub: "12,200 × 70%", color: "#00d4aa" },
              { label: "Net savings/ปี", val: "฿92,480", sub: "102,480 − 10,000 GWS", color: "#00d4aa" },
              { label: "GWS 5 ปี", val: "฿50,000", sub: "10,000 × 5 ปี", color: "#6366f1" },
              { label: "Net savings 5 ปี", val: "฿462,400", sub: "512,400 − 50,000", color: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-[#1e2d4a] bg-[#0d1520] px-3 py-4 text-center">
                <div className="text-[10px] text-[#64748b] mb-1">{s.label}</div>
                <div className="text-lg font-extrabold" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[10px] text-[#334155] mt-1">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* 5-year bar chart */}
          <div className="rounded-xl border border-[#1e2d4a] bg-[#0d1520] px-6 py-5">
            <div className="mb-1 text-[10px] uppercase tracking-widest text-[#64748b]">Net Cumulative Savings — 5-Year Projection (หักค่า GWS แล้ว)</div>
            <div className="mb-4 text-[10px] text-[#334155]">Net = ประหยัด 70% − GWS ฿10,000/ปี</div>
            <div className="flex items-end gap-3 h-28">
              {[
                { year: "ปีที่ 1", net: 92480, cum: 92480, pct: 20 },
                { year: "ปีที่ 2", net: 92480, cum: 184960, pct: 40 },
                { year: "ปีที่ 3", net: 92480, cum: 277440, pct: 60 },
                { year: "ปีที่ 4", net: 92480, cum: 369920, pct: 80 },
                { year: "ปีที่ 5", net: 92480, cum: 462400, pct: 100 },
              ].map((b) => (
                <div key={b.year} className="flex flex-col items-center gap-1 flex-1">
                  <div className="text-[10px] font-bold" style={{ color: b.pct === 100 ? "#f59e0b" : "#00d4aa" }}>
                    ฿{(b.cum/1000).toFixed(0)}K
                  </div>
                  <div
                    className="w-full rounded-t-md"
                    style={{
                      height: `${b.pct * 0.8}px`,
                      background: b.pct === 100
                        ? "linear-gradient(180deg,#f59e0b,#d97706)"
                        : "linear-gradient(180deg,#00d4aa,#0ea5e9)",
                    }}
                  />
                  <div className="text-[10px] text-[#475569]">{b.year}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] border-t border-[#1e2d4a] pt-3">
              <span className="text-[#334155]">ลงทุน GWS ฿10,000/ปี · ROI 924% ปีแรก</span>
              <span className="text-[#f59e0b] font-bold">Net 5 ปี = ฿462,400</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-[#1e2d4a] py-24" style={{ background: "rgba(6,9,26,0.7)" }}>
        <div className="mx-auto max-w-5xl px-8">
          <div className="mb-3 text-[10px] uppercase tracking-widest text-[#00d4aa]">// About</div>
          <h2 className="mb-12 text-2xl font-bold text-[#f1f5f9]">Certificates &amp; Standards</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <p className="mb-4 text-sm text-[#64748b] leading-relaxed">
                QMS Engineer with 5+ years building and managing quality management systems across ISO
                9001, ISO 14001, ISO 45001, and IATF 16949. Passionate about using AI and digital tools
                to transform traditional QMS into intelligent automated systems.
              </p>
              <p className="text-sm text-[#64748b] leading-relaxed">
                Currently developing closed-loop IATF 16949 core tools automation at{" "}
                <a
                  href="https://phatcharaphon.vercel.app"
                  className="text-[#00d4aa] hover:underline"
                  target="_blank"
                >
                  phatcharaphon.vercel.app
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              {certs.map((c) => (
                <a
                  key={c.label}
                  href={c.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-[#1e2d4a] bg-[#111827] px-4 py-3 hover:border-[#00d4aa] hover:bg-[#0d1520] transition-colors group"
                >
                  <span className="text-base flex-shrink-0">{c.icon}</span>
                  <span className="text-xs text-[#94a3b8] group-hover:text-[#00d4aa] transition-colors flex-1">{c.label}</span>
                  <svg className="w-3.5 h-3.5 text-[#334155] group-hover:text-[#00d4aa] flex-shrink-0 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1e2d4a] py-8 text-center text-xs text-[#334155]">
        <a href="https://phatcharaphon.vercel.app" className="text-[#00d4aa] hover:underline" target="_blank">
          phatcharaphon.vercel.app
        </a>
        {" · "}Built with Next.js &amp; Tailwind CSS
      </footer>
    </>
  );
}
