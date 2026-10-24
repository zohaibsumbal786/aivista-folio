// Global performance store: samples FPS with a single rAF loop and lets scenes
// register their active particle counts. Consumers subscribe to updates.

export type QualityTier = "low" | "medium" | "high";

type State = {
  fps: number;
  frameMs: number;
  tier: QualityTier;
  particles: number;
};

const state: State = { fps: 60, frameMs: 16.67, tier: "high", particles: 0 };
const listeners = new Set<(s: State) => void>();
const sceneParticles = new Map<string, number>();

let rafId: number | null = null;
let lastT = 0;
let frames = 0;
let acc = 0;
let subscribers = 0;
let lowStreak = 0;
let highStreak = 0;

function emit() {
  for (const l of listeners) l(state);
}

function computeTier(fps: number): QualityTier {
  if (fps < 32) {
    lowStreak++;
    highStreak = 0;
  } else if (fps > 52) {
    highStreak++;
    lowStreak = 0;
  } else {
    lowStreak = 0;
    highStreak = 0;
  }
  if (lowStreak >= 45 && state.tier !== "low") return state.tier === "high" ? "medium" : "low";
  if (highStreak >= 90 && state.tier !== "high") return state.tier === "low" ? "medium" : "high";
  return state.tier;
}

function loop(t: number) {
  if (lastT) {
    const dt = t - lastT;
    acc += dt;
    frames++;
    if (acc >= 500) {
      const fps = Math.round((frames * 1000) / acc);
      state.fps = fps;
      state.frameMs = +(acc / frames).toFixed(2);
      state.tier = computeTier(fps);
      state.particles = Array.from(sceneParticles.values()).reduce((a, b) => a + b, 0);
      acc = 0;
      frames = 0;
      emit();
    }
  }
  lastT = t;
  rafId = requestAnimationFrame(loop);
}

function start() {
  if (rafId != null || typeof window === "undefined") return;
  lastT = 0;
  frames = 0;
  acc = 0;
  rafId = requestAnimationFrame(loop);
}

function stop() {
  if (rafId != null) cancelAnimationFrame(rafId);
  rafId = null;
}

export function subscribe(fn: (s: State) => void) {
  listeners.add(fn);
  subscribers++;
  if (subscribers === 1) start();
  fn(state);
  return () => {
    listeners.delete(fn);
    subscribers--;
    if (subscribers === 0) stop();
  };
}

export function getState() {
  return state;
}

export function reportParticles(id: string, n: number) {
  sceneParticles.set(id, n);
}

export function clearParticles(id: string) {
  sceneParticles.delete(id);
}
