"use client";
import { useState, useEffect, useCallback } from "react";

interface Props {
  images: string[];
  browserLabel: string;
}

export default function ScreenshotCarousel({ images, browserLabel }: Props) {
  const [valid, setValid] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);

  // Test which images actually exist
  useEffect(() => {
    if (images.length === 0) { setLoaded(true); return; }
    const results: { src: string; ok: boolean }[] = [];
    let count = 0;
    images.forEach((src) => {
      const img = new window.Image();
      img.onload = () => {
        results.push({ src, ok: true });
        count++;
        if (count === images.length) finalize();
      };
      img.onerror = () => {
        results.push({ src, ok: false });
        count++;
        if (count === images.length) finalize();
      };
      img.src = src;
    });
    function finalize() {
      const sorted = images.filter((s) => results.find((r) => r.src === s && r.ok));
      setValid(sorted);
      setCurrent(0);
      setLoaded(true);
    }
  }, [images]);

  const next = useCallback(() => setCurrent((c) => (c + 1) % valid.length), [valid.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + valid.length) % valid.length), [valid.length]);

  useEffect(() => {
    if (valid.length <= 1 || paused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [valid.length, next, paused]);

  return (
    <div className="rounded-xl overflow-hidden border border-[#1e2d4a] shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
      {/* Browser bar */}
      <div className="bg-[#0d1520] px-4 py-2.5 flex items-center gap-2 border-b border-[#1e2d4a]">
        <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
        <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
        <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
        <div className="ml-2 flex-1 bg-[#1e2d4a] rounded px-3 py-1 text-[11px] text-[#475569] truncate">
          {browserLabel}
        </div>
        {valid.length > 0 && (
          <div className="text-[10px] text-[#334155] flex-shrink-0">{current + 1} / {valid.length}</div>
        )}
      </div>

      {/* Image area */}
      <div
        className="relative overflow-hidden bg-[#060918]"
        style={{ height: 480 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {!loaded ? (
          // Loading state
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#1e2d4a] border-t-[#00d4aa] animate-spin" />
          </div>
        ) : valid.length === 0 ? (
          // Placeholder — no images yet
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-8">
            <div className="text-4xl opacity-20">🖼️</div>
            <div className="text-[#334155] text-xs leading-relaxed">
              วางรูป screenshot ใน<br />
              <span className="text-[#475569] font-mono">public/screenshots/esd/</span><br />
              ชื่อไฟล์ <span className="text-[#475569] font-mono">1.png · 2.png · 3.png ...</span>
            </div>
          </div>
        ) : (
          // Carousel images
          valid.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Screenshot ${i + 1}`}
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500"
              style={{ opacity: i === current ? 1 : 0 }}
            />
          ))
        )}

        {/* Pause indicator */}
        {paused && valid.length > 1 && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] text-white"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <span>⏸</span> หยุดชั่วคราว
          </div>
        )}

        {/* Prev / Next */}
        {valid.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white text-lg transition-all hover:scale-110"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white text-lg transition-all hover:scale-110"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {valid.length > 1 && (
        <div className="bg-[#0d1520] flex justify-center gap-1.5 py-2.5">
          {valid.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                background: i === current ? "#00d4aa" : "#1e2d4a",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
