"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

type Vec3 = [number, number, number];

function Truck({
  position,
  rotation = [0, 0, 0],
}: {
  position: Vec3;
  rotation?: Vec3;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Cabin */}
      <mesh position={[0, 1.2, 1.8]} castShadow>
        <boxGeometry args={[2.2, 1.8, 2.2]} />
        <meshStandardMaterial color="#e11d2e" metalness={0.4} roughness={0.35} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 1.4, -1.6]} castShadow>
        <boxGeometry args={[2.4, 2.4, 4.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Wheels */}
      {(
        [
          [-1.1, 0.4, 1.5],
          [1.1, 0.4, 1.5],
          [-1.1, 0.4, -2.8],
          [1.1, 0.4, -2.8],
        ] as Vec3[]
      ).map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.45, 0.45, 0.35, 16]} />
          <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      {/* Red stripe */}
      <mesh position={[0, 1.4, -1.6]}>
        <boxGeometry args={[2.42, 0.25, 4.82]} />
        <meshStandardMaterial
          color="#e11d2e"
          emissive="#e11d2e"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

function Container({
  position,
  color = "#e11d2e",
}: {
  position: Vec3;
  color?: string;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[2.4, 2.6, 6]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
    </mesh>
  );
}

function ReachStacker({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[3.5, 2.4, 6]} />
        <meshStandardMaterial color="#c41e2a" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* Arm */}
      <mesh position={[0, 4.5, -1]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 0.6, 8]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Cab */}
      <mesh position={[0.8, 2.8, 1.5]} castShadow>
        <boxGeometry args={[1.6, 1.6, 1.8]} />
        <meshStandardMaterial color="#222" metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Freighter({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {/* Hull */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[8, 3, 28]} />
        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Bridge */}
      <mesh position={[0, 4, 10]} castShadow>
        <boxGeometry args={[5, 5, 4]} />
        <meshStandardMaterial color="#334155" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* Containers on deck */}
      {([-8, -2, 4] as const).map((z, i) => (
        <Container
          key={i}
          position={[0, 2.9, z]}
          color={i % 2 === 0 ? "#e11d2e" : "#f8f8f8"}
        />
      ))}
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[200, 400]} />
      <meshStandardMaterial color="#111" metalness={0.1} roughness={0.9} />
    </mesh>
  );
}

export default function LogisticsScene({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(Date.now() * 0.00015) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[20, 40, 10]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={100}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
      <pointLight position={[-15, 10, -20]} intensity={0.6} color="#e11d2e" />
      <pointLight position={[15, 8, 30]} intensity={0.4} color="#ffffff" />

      <Ground />

      {/* Starting zone — warehouse / loading */}
      <ReachStacker position={[-8, 0, 40]} />
      <Truck position={[2, 0, 38]} rotation={[0, -0.3, 0]} />
      <Container position={[-3, 1.3, 32]} />
      <Container position={[5, 1.3, 28]} color="#f8f8f8" />

      {/* Road stretch */}
      <Truck position={[-4, 0, 10]} rotation={[0, 0.1, 0]} />
      <Truck position={[6, 0, -5]} rotation={[0, -0.15, 0]} />

      {/* Port / quay */}
      <mesh position={[0, 0.1, -40]} receiveShadow>
        <boxGeometry args={[60, 0.3, 30]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Containers at port */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Container
          key={i}
          position={[(i % 4) * 3.5 - 5, 1.3, -35 - Math.floor(i / 4) * 7]}
          color={i % 3 === 0 ? "#e11d2e" : "#e2e8f0"}
        />
      ))}

      {/* Ship */}
      <Freighter position={[0, 1.5, -70]} />

      {/* Distant second ship */}
      <group position={[25, 3, -110]} scale={0.7}>
        <Freighter position={[0, 0, 0]} />
      </group>

      {/* Fog-like atmosphere */}
      <fog attach="fog" args={["#0a0a0a", 40, 160]} />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.55}
        scale={120}
        blur={2.5}
        far={30}
      />

      <Environment preset="city" />
    </group>
  );
}
