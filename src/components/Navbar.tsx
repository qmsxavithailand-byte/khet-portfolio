"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  const isProject = path.startsWith("/projects");

  return (
    <nav className="sticky top-0 z-50 border-b border-[#1e2d4a] bg-[#0a0f1e]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <Link href="/" className="text-[#00d4aa] font-bold tracking-widest text-sm">
          KHET.QMS
        </Link>

        {isProject ? (
          <Link href="/#projects" className="flex items-center gap-2 text-[#64748b] text-sm hover:text-[#00d4aa] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        ) : (
          <div className="flex items-center gap-8 text-sm text-[#94a3b8]">
            <a href="#projects" className="hover:text-[#00d4aa] transition-colors">Projects</a>
            <a href="#kaizen" className="hover:text-[#00d4aa] transition-colors">Kaizen</a>
            <a href="#about" className="hover:text-[#00d4aa] transition-colors">About</a>
          </div>
        )}

        <a
          href="/Phatcharaphon_Resume.pdf"
          download="Phatcharaphon_Resume.pdf"
          className="rounded-md bg-[#00d4aa] px-4 py-2 text-xs font-bold text-[#0a0f1e] hover:bg-[#00bfa6] transition-colors"
        >
          Download Resume
        </a>
      </div>
    </nav>
  );
}
