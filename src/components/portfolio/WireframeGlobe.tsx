import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, Suspense, useMemo } from "react";
import * as THREE from "three";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { reportParticles, clearParticles } from "@/lib/perfStore";

function Globe({ speed, dotCount }: { speed: number; dotCount: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!g.current || speed === 0) return;
    g.current.rotation.y += delta * 0.35 * speed;
    g.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.15;
  });
  const dots = useMemo(() => {
    const arr: [number, number, number][] = [];
    const r = 1.6;
    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotCount);
      const theta = Math.sqrt(dotCount * Math.PI) * phi;
      arr.push([
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ]);
    }
    return arr;
  }, [dotCount]);
  return (
    <group ref={g}>
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.15} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.61, 24, 24]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.1} />
      </mesh>
      {dots.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#7dd3fc"} />
        </mesh>
      ))}
    </group>
  );
}

export function WireframeGlobe() {
  const q = useAdaptiveQuality();
  const dotCount = Math.max(60, Math.round(220 * q.scale));

  useEffect(() => {
    reportParticles("wireframe-globe", dotCount);
    return () => clearParticles("wireframe-globe");
  }, [dotCount]);

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 55 }}
      dpr={q.dpr}
      frameloop={q.animate ? "always" : "demand"}
      gl={{ alpha: true, antialias: q.antialias, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <Globe speed={q.animate ? 1 : 0} dotCount={dotCount} />
      </Suspense>
    </Canvas>
  );
}

export default WireframeGlobe;
