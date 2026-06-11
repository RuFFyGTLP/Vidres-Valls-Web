"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

function GlassParticles({ count = 50 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  });

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1] + Math.sin(time * 0.5 + i) * 0.5;
      const z = positions[i * 3 + 2];
      dummy.position.set(x, y, z);
      dummy.rotation.set(time * 0.2 + i, time * 0.3 + i, 0);
      dummy.scale.setScalar(0.3 + Math.sin(time + i) * 0.1);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.5, 0]} />
      <MeshTransmissionMaterial
        transmission={0.95}
        thickness={0.5}
        roughness={0.1}
        chromaticAberration={0.02}
        color="#88ccff"
        backside
      />
    </instancedMesh>
  );
}

function GlassCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <MeshTransmissionMaterial
          transmission={0.9}
          thickness={0.8}
          roughness={0.05}
          chromaticAberration={0.03}
          color="#aaddff"
          backside
        />
      </mesh>
    </Float>
  );
}

function GlassTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.4;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[2, -1, -1]}>
        <torusGeometry args={[0.8, 0.3, 32, 64]} />
        <MeshTransmissionMaterial
          transmission={0.85}
          thickness={0.6}
          roughness={0.1}
          chromaticAberration={0.02}
          color="#88ddff"
          backside
        />
      </mesh>
    </Float>
  );
}

function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.5;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[-2, 1, -2]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshTransmissionMaterial
          transmission={0.92}
          thickness={0.7}
          roughness={0.08}
          chromaticAberration={0.025}
          color="#99eeff"
          backside
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#88ccff" />

      <GlassParticles count={40} />
      <GlassCube />
      <GlassTorus />
      <GlassSphere />

      <Environment preset="city" />
    </>
  );
}

interface GlassExperienceProps {
  className?: string;
}

export default function GlassExperience({ className = "" }: GlassExperienceProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`bg-gradient-to-br from-dark-bg via-sage-900/50 to-dark-bg ${className}`} />
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}