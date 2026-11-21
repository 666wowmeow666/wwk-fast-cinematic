"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

type Vec3 = [number, number, number];

/* -------------------- TRUCK -------------------- */
function Truck({
  position,
  rotation = [0, 0, 0],
  moving = false,
}: {
  position: Vec3;
  rotation?: Vec3;
  moving?: boolean;
}) {
  const wheels = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (moving && wheels.current) {
      wheels.current.rotation.x -= delta * 4;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Chassis */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[2.4, 0.35, 7.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 1.55, 2.4]} castShadow>
        <boxGeometry args={[2.35, 1.7, 2.1]} />
        <meshStandardMaterial color="#e11d2e" metalness={0.35} roughness={0.3} />
      </mesh>

      {/* Cabin roof lip */}
      <mesh position={[0, 2.45, 2.4]} castShadow>
        <boxGeometry args={[2.4, 0.15, 2.15]} />
        <meshStandardMaterial color="#b01522" metalness={0.4} roughness={0.35} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 1.75, 3.45]}>
        <boxGeometry args={[2.1, 1.1, 0.08]} />
        <meshStandardMaterial
          color="#87ceeb"
          transparent
          opacity={0.35}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Trailer */}
      <mesh position={[0, 1.7, -1.6]} castShadow>
        <boxGeometry args={[2.45, 2.7, 5.4]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.25} roughness={0.55} />
      </mesh>

      {/* Red brand stripe on trailer */}
      <mesh position={[0, 2.2, -1.6]}>
        <boxGeometry args={[2.47, 0.35, 5.42]} />
        <meshStandardMaterial
          color="#e11d2e"
          emissive="#e11d2e"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Wheels group */}
      <group ref={wheels}>
        {[
          [-1.05, 0.42, 2.6],
          [1.05, 0.42, 2.6],
          [-1.05, 0.42, 1.1],
          [1.05, 0.42, 1.1],
          [-1.05, 0.42, -2.4],
          [1.05, 0.42, -2.4],
          [-1.05, 0.42, -3.6],
          [1.05, 0.42, -3.6],
        ].map((pos, i) => (
          <group key={i} position={pos as Vec3}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.48, 0.48, 0.38, 18]} />
              <meshStandardMaterial color="#111" metalness={0.7} roughness={0.35} />
            </mesh>
            {/* Rim */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.28, 0.28, 0.4, 12]} />
              <meshStandardMaterial color="#444" metalness={0.8} roughness={0.25} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Headlights */}
      <mesh position={[-0.7, 1.15, 3.5]}>
        <boxGeometry args={[0.35, 0.22, 0.12]} />
        <meshStandardMaterial
          color="#fff7ed"
          emissive="#fff7ed"
          emissiveIntensity={1.2}
        />
      </mesh>
      <mesh position={[0.7, 1.15, 3.5]}>
        <boxGeometry args={[0.35, 0.22, 0.12]} />
        <meshStandardMaterial
          color="#fff7ed"
          emissive="#fff7ed"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

/* -------------------- CONTAINER -------------------- */
function Container({
  position,
  color = "#e11d2e",
  rotation = [0, 0, 0],
}: {
  position: Vec3;
  color?: string;
  rotation?: Vec3;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.44, 2.59, 6.06]} />
        <meshStandardMaterial color={color} metalness={0.45} roughness={0.4} />
      </mesh>

      {/* Corrugation simulation - vertical ribs */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh
          key={i}
          position={[-1.22 + (i + 1) * 0.24, 0, 0]}
          castShadow
        >
          <boxGeometry args={[0.04, 2.55, 6.05]} />
          <meshStandardMaterial
            color={color}
            metalness={0.55}
            roughness={0.35}
          />
        </mesh>
      ))}

      {/* Door end detail */}
      <mesh position={[0, 0, 3.05]}>
        <boxGeometry args={[2.42, 2.55, 0.08]} />
        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* -------------------- REACH STACKER -------------------- */
function ReachStacker({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {/* Chassis / base */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <boxGeometry args={[3.6, 1.8, 6.2]} />
        <meshStandardMaterial color="#c41e2a" metalness={0.4} roughness={0.35} />
      </mesh>

      {/* Counterweight */}
      <mesh position={[0, 1.4, 2.6]} castShadow>
        <boxGeometry args={[3.4, 1.6, 1.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Cabin */}
      <mesh position={[1.1, 2.6, 0.8]} castShadow>
        <boxGeometry args={[1.5, 1.8, 1.9]} />
        <meshStandardMaterial color="#1e293b" metalness={0.35} roughness={0.4} />
      </mesh>

      {/* Boom base */}
      <mesh position={[-0.4, 2.4, -1.2]} castShadow>
        <boxGeometry args={[1.1, 1.1, 1.4]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Main boom */}
      <mesh
        position={[-0.4, 4.8, -3.2]}
        rotation={[0.55, 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.7, 0.55, 7.5]} />
        <meshStandardMaterial color="#444" metalness={0.65} roughness={0.25} />
      </mesh>

      {/* Spreader / head */}
      <mesh position={[-0.4, 6.6, -6.4]} castShadow>
        <boxGeometry args={[2.6, 0.4, 1.2]} />
        <meshStandardMaterial color="#e11d2e" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Wheels */}
      {[
        [-1.4, 0.55, 2.0],
        [1.4, 0.55, 2.0],
        [-1.4, 0.55, -2.0],
        [1.4, 0.55, -2.0],
      ].map((pos, i) => (
        <mesh
          key={i}
          position={pos as Vec3}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.65, 0.65, 0.55, 16]} />
          <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------- FREIGHTER -------------------- */
function Freighter({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      {/* Hull */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[9.5, 3.2, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.55} roughness={0.35} />
      </mesh>

      {/* Waterline stripe */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[9.6, 0.35, 32.1]} />
        <meshStandardMaterial color="#e11d2e" metalness={0.4} roughness={0.4} />
      </mesh>

      {/* Bridge / superstructure */}
      <mesh position={[0, 4.2, 11]} castShadow>
        <boxGeometry args={[6.5, 4.5, 5]} />
        <meshStandardMaterial color="#334155" metalness={0.4} roughness={0.4} />
      </mesh>

      {/* Bridge windows */}
      <mesh position={[0, 5.4, 13.55]}>
        <boxGeometry args={[5.8, 1.2, 0.1]} />
        <meshStandardMaterial
          color="#93c5fd"
          transparent
          opacity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Funnel */}
      <mesh position={[0, 7.5, 9]} castShadow>
        <boxGeometry args={[1.8, 2.8, 2.2]} />
        <meshStandardMaterial color="#e11d2e" metalness={0.45} roughness={0.35} />
      </mesh>

      {/* Deck containers */}
      {[
        [-3, -8],
        [0, -8],
        [3, -8],
        [-3, -1.5],
        [0, -1.5],
        [3, -1.5],
        [-1.5, 5],
        [1.5, 5],
      ].map(([x, z], i) => (
        <Container
          key={i}
          position={[x, 2.9, z]}
          color={i % 3 === 0 ? "#e11d2e" : i % 3 === 1 ? "#f8f8f8" : "#0f766e"}
          rotation={[0, 0, 0]}
        />
      ))}
    </group>
  );
}

/* -------------------- GROUND / PORT -------------------- */
function EnvironmentBase() {
  return (
    <group>
      {/* Main ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[220, 420]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.05} roughness={0.95} />
      </mesh>

      {/* Road strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 15]} receiveShadow>
        <planeGeometry args={[14, 90]} />
        <meshStandardMaterial color="#1c1c1c" metalness={0.1} roughness={0.85} />
      </mesh>

      {/* Road markings */}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.03, 50 - i * 5]}
        >
          <planeGeometry args={[0.25, 2.2]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      ))}

      {/* Quay platform */}
      <mesh position={[0, 0.15, -42]} receiveShadow>
        <boxGeometry args={[70, 0.4, 28]} />
        <meshStandardMaterial color="#171717" metalness={0.15} roughness={0.8} />
      </mesh>

      {/* Quay edge */}
      <mesh position={[0, 0.45, -28]} receiveShadow>
        <boxGeometry args={[70, 0.6, 1.2]} />
        <meshStandardMaterial color="#262626" metalness={0.2} roughness={0.7} />
      </mesh>
    </group>
  );
}

/* -------------------- MAIN SCENE -------------------- */
export default function LogisticsScene({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(Date.now() * 0.00012) * 0.015;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[25, 45, 15]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={120}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <pointLight position={[-18, 12, -25]} intensity={0.7} color="#e11d2e" />
      <pointLight position={[18, 10, 25]} intensity={0.45} color="#ffffff" />
      <hemisphereLight args={["#1e293b", "#0a0a0a", 0.35]} />

      <EnvironmentBase />

      {/* Loading zone */}
      <ReachStacker position={[-9, 0, 42]} />
      <Truck position={[3, 0, 38]} rotation={[0, -0.25, 0]} moving />
      <Container position={[-2.5, 1.3, 33]} />
      <Container position={[6, 1.3, 29]} color="#f8f8f8" />
      <Container position={[-5, 1.3, 26]} color="#0f766e" />

      {/* Road trucks */}
      <Truck position={[-3.5, 0, 12]} rotation={[0, 0.08, 0]} moving />
      <Truck position={[5.5, 0, -4]} rotation={[0, -0.12, 0]} moving />
      <Truck position={[-2, 0, -18]} rotation={[0, 0.05, 0]} moving />

      {/* Port containers */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Container
          key={i}
          position={[
            (i % 4) * 3.2 - 4.8,
            1.3,
            -36 - Math.floor(i / 4) * 6.8,
          ]}
          color={
            i % 4 === 0
              ? "#e11d2e"
              : i % 4 === 1
              ? "#f8f8f8"
              : i % 4 === 2
              ? "#0f766e"
              : "#1e40af"
          }
        />
      ))}

      {/* Ships */}
      <Freighter position={[0, 1.6, -72]} />
      <group position={[28, 3.5, -115]} scale={0.65}>
        <Freighter position={[0, 0, 0]} />
      </group>

      <fog attach="fog" args={["#0a0a0a", 35, 170]} />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.6}
        scale={140}
        blur={2.8}
        far={35}
      />

      <Environment preset="city" />
    </group>
  );
}
