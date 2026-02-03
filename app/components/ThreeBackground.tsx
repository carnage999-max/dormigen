"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  
  const points = useMemo(() => {
    const p = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.1;
    ref.current.rotation.y += delta * 0.15;
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4698DA"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

function Helix() {
  const count = 40;
  const radius = 2;
  const height = 10;
  
  const spheres = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 4;
      const y = (i / count) * height - height / 2;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
    });
  }, []);

  return (
    <group rotation={[0.5, 0, 0.3]}>
      {spheres.map((pos, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#3C67AC" emissive="#4698DA" emissiveIntensity={0.5} transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles />
        <Helix />
      </Canvas>
    </div>
  );
}
