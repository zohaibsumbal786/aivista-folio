import { useEffect, useState } from "react";
import { subscribe } from "@/lib/perfStore";

/**
 * Lightweight FPS / frame-time / particle overlay.
 * Toggle with Alt+P, or auto-enable when the URL contains ?debug=perf.
 */
export function PerfOverlay() {
  const [open, setOpen] = useState(false);
  const [s, setS] = useState({ fps: 0, frameMs: 0, tier: "high", particles: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "perf") setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "p" || e.key === "P")) setOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    return subscribe((next) =>
      setS({ fps: next.fps, frameMs: next.frameMs, tier: next.tier, particles: next.particles }),
    );
  }, [open]);

  if (!open) return null;

  const color = s.fps >= 50 ? "#22d3ee" : s.fps >= 35 ? "#facc15" : "#f87171";

  return (
    <div
      role="status"
      aria-label="Performance overlay"
      className="fixed bottom-3 right-3 z-[80] font-mono text-[11px] leading-tight rounded-lg border border-white/10 bg-black/70 backdrop-blur px-3 py-2 shadow-lg select-none pointer-events-auto"
      style={{ color }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="uppercase tracking-widest text-white/60">perf</span>
        <button
          onClick={() => setOpen(false)}
          className="text-white/40 hover:text-white/80"
          aria-label="Close performance overlay"
        >
          ×
        </button>
      </div>
      <div>FPS: <b>{s.fps}</b></div>
      <div className="text-white/70">frame: {s.frameMs} ms</div>
      <div className="text-white/70">tier: {s.tier}</div>
      <div className="text-white/70">particles: {s.particles.toLocaleString()}</div>
      <div className="text-white/40 mt-1">Alt+P to toggle</div>
    </div>
  );
}
