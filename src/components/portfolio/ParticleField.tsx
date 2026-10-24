import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, Suspense } from "react";
import * as THREE from "three";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { reportParticles, clearParticles } from "@/lib/perfStore";

function Field({ speed, count }: { speed: number; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);
  useFrame((_, delta) => {
    if (!ref.current || speed === 0) return;
    ref.current.rotation.y += delta * 0.03 * speed;
    ref.current.rotation.x += delta * 0.01 * speed;
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function ParticleField() {
  const q = useAdaptiveQuality();
  const count = Math.max(200, Math.round(1500 * q.scale));

  useEffect(() => {
    reportParticles("particle-field", count);
    return () => clearParticles("particle-field");
  }, [count]);

  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 60 }}
      dpr={q.dpr}
      frameloop={q.animate ? "always" : "demand"}
      gl={{ alpha: true, antialias: q.antialias, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <Field speed={q.animate ? 1 : 0} count={count} />
      </Suspense>
    </Canvas>
  );
}

export default ParticleField;
