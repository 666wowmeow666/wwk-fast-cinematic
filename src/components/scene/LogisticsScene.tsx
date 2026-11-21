"use client";

import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Vec3 = [number, number, number];

/* -------------------- REAL MODELS -------------------- */

function RealContainer({
  position,
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position: Vec3;
  rotation?: Vec3;
  scale?: number;
}) {
  const { scene } = useGLTF("/models/shipping-container.glb");
  const cloned = scene.clone();

  return (
    <primitive
      object={cloned}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    />
  );
}

function RealReachTruck({
  position,
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position: Vec3;
  rotation?: Vec3;
  scale?: number;
}) {
  const { scene } = useGLTF("/models/electric-reach-truck-1-6-t-moving-mast.glb");
  const cloned = scene.clone();

  return (
    <primitive
      object={cloned}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    />
  );
}

function RealShip({
  position,
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position: Vec3;
  rotation?: Vec3;
  scale?: number;
}) {
  const { scene } = useGLTF("/models/container-ship-loaded.glb");
  const cloned = scene.clone();

  return (
    <primitive
      object={cloned}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    />
  );
}

/* -------------------- PROCEDURAL TRUCK (fallback + detail) -------------------- */
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
      wheels.current.rotation.x -= delta * 5;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[2.4, 0.35, 7.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.55, 2.4]} castShadow>
        <boxGeometry args={[2.35, 1.7, 2.1]} />
        <meshStandardMaterial color="#e11d2e" metalness={0.35} roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.45, 2.4]} castShadow>
        <boxGeometry args={[2.4, 0.15, 2.15]} />
        <meshStandardMaterial color="#b01522" metalness={0.4} roughness={0.35} />
      </mesh>
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
      <mesh position={[0, 1.7, -1.6]} castShadow>
        <boxGeometry args={[2.45, 2.7, 5.4]} />
        <meshStandardMaterial color="#f1f5f9" metalness={0.25} roughness={0.55} />
      </mesh>
      <mesh position={[0, 2.2, -1.6]}>
        <boxGeometry args={[2.47, 0.35, 5.42]} />
        <meshStandardMaterial
          color="#e11d2e"
          emissive="#e11d2e"
          emissiveIntensity={0.25}
        />
      </mesh>
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
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.28, 0.28, 0.4, 12]} />
              <meshStandardMaterial color="#444" metalness={0.8} roughness={0.25} />
            </mesh>
          </group>
        ))}
      </group>
      <mesh position={[-0.7, 1.15, 3.5]}>
        <boxGeometry args={[0.35, 0.22, 0.12]} />
        <meshStandardMaterial color="#fff7ed" emissive="#fff7ed" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0.7, 1.15, 3.5]}>
        <boxGeometry args={[0.35, 0.22, 0.12]} />
        <meshStandardMaterial color="#fff7ed" emissive="#fff7ed" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

/* -------------------- ENVIRONMENT -------------------- */
function EnvironmentBase() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[260, 480]} />
        <meshStandardMaterial color="#0c0c0c" metalness={0.05} roughness={0.95} />
      </mesh>

      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 20]} receiveShadow>
        <planeGeometry args={[16, 110]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.85} />
      </mesh>

      {Array.from({ length: 22 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.03, 55 - i * 5]}
        >
          <planeGeometry args={[0.28, 2.4]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      ))}

      {/* Quay */}
      <mesh position={[0, 0.18, -48]} receiveShadow>
        <boxGeometry args={[90, 0.45, 36]} />
        <meshStandardMaterial color="#141414" metalness={0.15} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.5, -30]} receiveShadow>
        <boxGeometry args={[90, 0.7, 1.4]} />
        <meshStandardMaterial color="#222" metalness={0.2} roughness={0.7} />
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
    groupRef.current.rotation.y = Math.sin(Date.now() * 0.0001) * 0.012;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.28} />
      <directionalLight
        position={[30, 50, 18]}
        intensity={1.55}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={140}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />
      <pointLight position={[-20, 14, -30]} intensity={0.75} color="#e11d2e" />
      <pointLight position={[22, 12, 30]} intensity={0.5} color="#ffffff" />
      <hemisphereLight args={["#1e293b", "#050505", 0.4]} />

      <EnvironmentBase />

      <Suspense fallback={null}>
        {/* Loading zone — real reach truck + containers */}
        <RealReachTruck position={[-10, 0, 48]} rotation={[0, 0.4, 0]} scale={1.15} />
        <RealContainer position={[-3, 0, 38]} scale={1} />
        <RealContainer position={[5.5, 0, 34]} rotation={[0, 0.1, 0]} scale={1} />
        <RealContainer position={[-6, 0, 30]} scale={1} />

        {/* Road trucks (procedural for now) */}
        <Truck position={[-4, 0, 18]} rotation={[0, 0.06, 0]} moving />
        <Truck position={[5, 0, 2]} rotation={[0, -0.1, 0]} moving />
        <Truck position={[-2.5, 0, -14]} rotation={[0, 0.04, 0]} moving />

        {/* Port containers */}
        {Array.from({ length: 10 }).map((_, i) => (
          <RealContainer
            key={i}
            position={[
              (i % 5) * 3.4 - 6.8,
              0,
              -38 - Math.floor(i / 5) * 7.2,
            ]}
            scale={1}
          />
        ))}

        {/* Real container ship */}
        <RealShip position={[0, 0, -85]} rotation={[0, Math.PI / 2, 0]} scale={0.38} />
        <RealShip position={[35, 0, -130]} rotation={[0, Math.PI / 2 + 0.15, 0]} scale={0.28} />
      </Suspense>

      <fog attach="fog" args={["#080808", 30, 160]} />

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.65}
        scale={160}
        blur={3}
        far={40}
      />

      <Environment preset="city" />
    </group>
  );
}

// Preload models
useGLTF.preload("/models/shipping-container.glb");
useGLTF.preload("/models/electric-reach-truck-1-6-t-moving-mast.glb");
useGLTF.preload("/models/container-ship-loaded.glb");
