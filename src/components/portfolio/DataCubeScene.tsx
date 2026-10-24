import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

function DataCube({ speed }: { speed: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current || speed === 0) return;
    ref.current.rotation.x += delta * 0.55 * speed;
    ref.current.rotation.y += delta * 0.75 * speed;
    ref.current.rotation.z += delta * 0.15 * speed;
  });
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshBasicMaterial color="#7dd3fc" wireframe />
      </mesh>
      <mesh>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.35]} />
        <meshBasicMaterial color="#22d3ee" wireframe />
      </mesh>
    </group>
  );
}

export function DataCubeScene() {
  const q = useAdaptiveQuality();
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={q.dpr}
      frameloop={q.animate ? "always" : "demand"}
      gl={{ alpha: true, antialias: q.antialias, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} color="#7dd3fc" intensity={1} />
        <Float speed={q.animate ? 1.4 : 0} rotationIntensity={0.3} floatIntensity={0.6}>
          <DataCube speed={q.animate ? 1 : 0} />
        </Float>
      </Suspense>
    </Canvas>
  );
}

export default DataCubeScene;
