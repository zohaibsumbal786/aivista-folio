import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, Torus } from "@react-three/drei";
import { useEffect, useMemo, useRef, Suspense } from "react";
import * as THREE from "three";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";
import { reportParticles, clearParticles } from "@/lib/perfStore";

function ParticleSphere({ speed, count }: { speed: number; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.7 + Math.random() * 0.25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);
  useFrame((_, delta) => {
    if (!ref.current || speed === 0) return;
    ref.current.rotation.y += delta * 0.28 * speed;
    ref.current.rotation.x += delta * 0.08 * speed;
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#7dd3fc"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function Wire({ speed }: { speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current || speed === 0) return;
    ref.current.rotation.y -= delta * 0.35 * speed;
    ref.current.rotation.z += delta * 0.12 * speed;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

function InnerCore({ speed }: { speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || speed === 0) return;
    const t = state.clock.elapsedTime * speed;
    const s = 1 + Math.sin(t * 1.8) * 0.09;
    ref.current.scale.setScalar(s);
    ref.current.rotation.x = t * 0.6;
    ref.current.rotation.y = t * 0.9;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.55, 1]} />
      <meshBasicMaterial color="#22d3ee" wireframe />
    </mesh>
  );
}

function OrbitRings({ speed }: { speed: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!g.current || speed === 0) return;
    g.current.rotation.z += delta * 0.2 * speed;
    g.current.rotation.x += delta * 0.05 * speed;
  });
  return (
    <group ref={g}>
      <Torus args={[2.2, 0.008, 8, 120]} rotation={[Math.PI / 2.4, 0, 0]}>
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.6} />
      </Torus>
      <Torus args={[2.5, 0.008, 8, 120]} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.5} />
      </Torus>
      <Torus args={[2.8, 0.006, 8, 120]} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
      </Torus>
    </group>
  );
}

function OrbitDots({ speed }: { speed: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current || speed === 0) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.45 * speed;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.25;
  });
  const dots = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return [Math.cos(a) * 2.5, Math.sin(a) * 0.5, Math.sin(a) * 2.5] as [
          number,
          number,
          number,
        ];
      }),
    [],
  );
  return (
    <group ref={ref}>
      {dots.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={i % 2 ? "#a78bfa" : "#7dd3fc"} />
        </mesh>
      ))}
    </group>
  );
}

/** Floating polyhedra scattered around the scene for depth + parallax. */
function FloatingShapes({ speed, count }: { speed: number; count: number }) {
  const seeds = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const r = 3.2 + Math.random() * 1.2;
        const a = (i / count) * Math.PI * 2 + Math.random();
        return {
          pos: [Math.cos(a) * r, (Math.random() - 0.5) * 2.2, Math.sin(a) * r * 0.9] as [
            number,
            number,
            number,
          ],
          kind: i % 3,
          scale: 0.14 + Math.random() * 0.18,
          spin: 0.4 + Math.random() * 0.8,
          color: (["#7dd3fc", "#a78bfa", "#22d3ee"] as const)[i % 3],
        };
      }),
    [count],
  );
  return (
    <group>
      {seeds.map((s, i) => (
        <Float
          key={i}
          speed={speed === 0 ? 0 : 1 + (i % 3) * 0.3}
          rotationIntensity={0.8}
          floatIntensity={1.2}
        >
          <mesh position={s.pos} scale={s.scale} rotation={[i, i * 0.5, 0]}>
            {s.kind === 0 ? (
              <octahedronGeometry args={[1, 0]} />
            ) : s.kind === 1 ? (
              <tetrahedronGeometry args={[1, 0]} />
            ) : (
              <icosahedronGeometry args={[1, 0]} />
            )}
            <meshBasicMaterial color={s.color} wireframe transparent opacity={0.7} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/** Subtle camera drift so the whole scene feels alive. */
function CameraDrift({ speed }: { speed: number }) {
  const { camera } = useThree();
  useFrame((state) => {
    if (speed === 0) return;
    const t = state.clock.elapsedTime * speed;
    camera.position.x = Math.sin(t * 0.25) * 0.6;
    camera.position.y = Math.cos(t * 0.2) * 0.35;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function NeuralSphere() {
  const q = useAdaptiveQuality();
  const speed = q.animate ? 1 : 0;
  const count = Math.max(180, Math.round(1400 * q.scale));
  const shapeCount = Math.max(4, Math.round(12 * q.scale));

  useEffect(() => {
    reportParticles("neural-sphere", count + shapeCount);
    return () => clearParticles("neural-sphere");
  }, [count, shapeCount]);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 55 }}
      dpr={q.dpr}
      frameloop={q.animate ? "always" : "demand"}
      gl={{ antialias: q.antialias, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#7dd3fc" />
        <pointLight position={[-5, -3, -3]} intensity={0.8} color="#a78bfa" />
        <CameraDrift speed={speed} />
        <Float speed={q.animate ? 1.6 : 0} rotationIntensity={0.5} floatIntensity={0.9}>
          <ParticleSphere speed={speed} count={count} />
          <Wire speed={speed} />
          <InnerCore speed={speed} />
        </Float>
        <OrbitRings speed={speed} />
        <OrbitDots speed={speed} />
        <FloatingShapes speed={speed} count={shapeCount} />
      </Suspense>
    </Canvas>
  );
}

export default NeuralSphere;
