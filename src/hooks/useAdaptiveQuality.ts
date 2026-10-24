import { useEffect, useState } from "react";
import { subscribe, type QualityTier } from "@/lib/perfStore";
import { useIsMobile } from "./useIsMobile";
import { useReducedMotion } from "./useReducedMotion";

export type SceneQuality = {
  tier: QualityTier;
  /** Multiplier to apply to base particle/geometry counts (0..1). */
  scale: number;
  /** Whether animation should run at all. */
  animate: boolean;
  /** Suggested dpr range for <Canvas>. */
  dpr: [number, number];
  antialias: boolean;
};

export function useAdaptiveQuality(): SceneQuality {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [tier, setTier] = useState<QualityTier>(isMobile ? "medium" : "high");

  useEffect(() => {
    return subscribe((s) => setTier(s.tier));
  }, []);

  const baseScale =
    tier === "low" ? 0.35 : tier === "medium" ? 0.6 : isMobile ? 0.75 : 1;

  return {
    tier,
    scale: reduced ? Math.min(baseScale, 0.4) : baseScale,
    animate: !reduced,
    dpr:
      tier === "low"
        ? [1, 1]
        : tier === "medium"
          ? [1, 1.2]
          : isMobile
            ? [1, 1.4]
            : [1, 1.8],
    antialias: tier === "high" && !isMobile,
  };
}
