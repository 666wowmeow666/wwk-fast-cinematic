"use client";

import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Vec3 = [number, number, number];

function RealContainer({
  position,
  rotation = [0, 0, 0] as Vec3,
  scale = 1,
}: {
  position: Vec3;
  rotation?: Vec3;
  scale?: number;
}) {
  const { scene } = useGLTF("/models/shipping-container.glb");
  const cloned = useRef(scene.clone(true)).current;
  return <primitive object={cloned} position={position} rotation={rotation} scale={scale} />;
}

function RealReachTruck({
  position,
  rotation = [0, 0, 0] as Vec3,
  scale = 1,
}: {
  position: Vec3;
  rotation?: Vec3;
  scale?: number;
}) {
  const { scene } = useGLTF("/models/electric-reach-truck-1-6-t-moving-mast.glb");
  const cloned = useRef(scene.clone(true)).current;
  return <primitive object={cloned} position={position} rotation={rotation} scale={scale} />;
}

function RealShip({
  position,
  rotation = [0, 0, 0] as Vec3,
  scale = 1,
}: {
  position: Vec3;
  rotation?: Vec3;
  scale?: number;
}) {
  const { scene } = useGLTF("/models/container-ship-loaded.glb");
  const cloned = useRef(scene.clone(true)).current;
  return <primitive object={cloned} position={position} rotation={rotation} scale={scale} />;
}

function Truck({
  position,
  rotation = [0, 0, 0] as Vec3,
  moving = false,
}: {
  position: Vec3;
  rotation?: Vec3;
  moving?: boolean;
}) {
  const wheels = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (moving && wheels.current) {
      wheels.current.rotation.x -= delta * 7;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.38, 0.1]} castShadow>
        <boxGeometry args={[2.15, 0.22, 7.4]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.7} roughness={0.35} />
      </mesh>

      <mesh position={[-1.15, 0.55, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 1.4, 12]} />
        <meshStandardMaterial color="#1c1c1c" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[1.15, 0.55, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 1.4, 12]} />
        <meshStandardMaterial color="#1c1c1c" metalness={0.6} roughness={0.4} />
      </mesh>

      <mesh position={[0, 1.35, 2.55]} castShadow>
        <boxGeometry args={[2.2, 1.4, 1.9]} />
        <meshStandardMaterial color="#e11d2e" metalness={0.4} roughness={0.28} />
      </mesh>

      <mesh position={[0, 2.15, 2.35]} castShadow>
        <boxGeometry args={[2.15, 0.55, 1.5]} />
        <meshStandardMaterial color="#be123c" metalness={0.4} roughness={0.3} />
      </mesh>

      <mesh position={[0, 1.7, 3.48]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[1.95, 0.95, 0.06]} />
        <meshStandardMaterial color="#7dd3fc" transparent opacity={0.28} metalness={0.95} roughness={0.05} />
      </mesh>

      <mesh position={[-1.12, 1.65, 2.5]}>
        <boxGeometry args={[0.05, 0.7, 1.3]} />
        <meshStandardMaterial color="#7dd3fc" transparent opacity={0.25} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.12, 1.65, 2.5]}>
        <boxGeometry args={[0.05, 0.7, 1.3]} />
        <meshStandardMaterial color="#7dd3fc" transparent opacity={0.25} metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0.55, 3.55]} castShadow>
        <boxGeometry args={[2.25, 0.35, 0.35]} />
        <meshStandardMaterial color="#27272a" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh position={[0, 1.55, -1.55]} castShadow>
        <boxGeometry args={[2.35, 2.55, 5.1]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.2} roughness={0.55} />
      </mesh>

      {[-1.8, -0.9, 0, 0.9, 1.8].map((z, i) => (
        <mesh key={i} position={[0, 1.55, -1.55 + z * 0.7]}>
          <boxGeometry args={[2.37, 2.5, 0.06]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.25} roughness={0.5} />
        </mesh>
      ))}

      <mesh position={[0, 2.15, -1.55]}>
        <boxGeometry args={[2.38, 0.32, 5.12]} />
        <meshStandardMaterial color="#e11d2e" emissive="#e11d2e" emissiveIntensity={0.4} />
      </mesh>

      <group ref={wheels}>
        {[
          [-1.05, 0.38, 2.55], [1.05, 0.38, 2.55],
          [-1.05, 0.38, 1.15], [1.05, 0.38, 1.15],
          [-1.05, 0.38, -2.15], [1.05, 0.38, -2.15],
          [-1.05, 0.38, -3.35], [1.05, 0.38, -3.35],
        ].map((p, i) => (
          <group key={i} position={p as Vec3}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.42, 0.42, 0.32, 18]} />
              <meshStandardMaterial color="#09090b" metalness={0.55} roughness={0.4} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.24, 0.24, 0.34, 12]} />
              <meshStandardMaterial color="#3f3f46" metalness={0.85} roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>

      <mesh position={[-0.7, 0.95, 3.65]}>
        <boxGeometry args={[0.38, 0.22, 0.12]} />
        <meshStandardMaterial color="#fff7ed" emissive="#fff7ed" emissiveIntensity={2.2} />
      </mesh>
      <mesh position={[0.7, 0.95, 3.65]}>
        <boxGeometry args={[0.38, 0.22, 0.12]} />
        <meshStandardMaterial color="#fff7ed" emissive="#fff7ed" emissiveIntensity={2.2} />
      </mesh>

      <mesh position={[-1.25, 1.7, 3.3]} castShadow>
        <boxGeometry args={[0.08, 0.35, 0.25]} />
        <meshStandardMaterial color="#18181b" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[1.25, 1.7, 3.3]} castShadow>
        <boxGeometry args={[0.08, 0.35, 0.25]} />
        <meshStandardMaterial color="#18181b" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

function EnvironmentBase() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[300, 500]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} metalness={0.05} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 25]} receiveShadow>
        <planeGeometry args={[18, 130]} />
        <meshStandardMaterial color="#171717" roughness={0.85} />
      </mesh>
      {Array.from({ length: 26 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 70 - i * 5.5]}>
          <planeGeometry args={[0.3, 2.6]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      ))}
      <mesh position={[0, 0.2, -55]} receiveShadow>
        <boxGeometry args={[100, 0.5, 45]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.55, -32]} receiveShadow>
        <boxGeometry args={[100, 0.7, 1.6]} />
        <meshStandardMaterial color="#1f1f1f" />
      </mesh>
    </group>
  );
}

export default function LogisticsScene({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.00008) * 0.008;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[40, 60, 25]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={200}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />
      <pointLight position={[-25, 18, -40]} intensity={1.1} color="#e11d2e" distance={80} />
      <pointLight position={[30, 15, 40]} intensity={0.6} color="#ffffff" distance={60} />
      <hemisphereLight args={["#1e293b", "#050505", 0.45]} />

      <EnvironmentBase />

      <Suspense fallback={null}>
        <RealReachTruck position={[-12, 0, 58]} rotation={[0, 0.6, 0]} scale={2.2} />
        <RealContainer position={[-4, 0, 48]} scale={1.8} />
        <RealContainer position={[6, 0, 44]} rotation={[0, 0.15, 0]} scale={1.8} />
        <RealContainer position={[-7, 0, 40]} scale={1.8} />

        <Truck position={[-5, 0, 28]} rotation={[0, 0.08, 0]} moving />
        <Truck position={[6, 0, 12]} rotation={[0, -0.12, 0]} moving />
        <Truck position={[-3, 0, -5]} rotation={[0, 0.05, 0]} moving />
        <Truck position={[4.5, 0, -22]} rotation={[0, -0.08, 0]} moving />

        {Array.from({ length: 12 }).map((_, i) => (
          <RealContainer
            key={i}
            position={[(i % 4) * 5.5 - 8, 0, -42 - Math.floor(i / 4) * 9]}
            scale={1.7}
          />
        ))}

        <RealShip position={[0, -2, -95]} rotation={[0, Math.PI / 2, 0]} scale={0.22} />
      </Suspense>

      <fog attach="fog" args={["#070707", 25, 140]} />
      <ContactShadows position={[0, 0.02, 0]} opacity={0.7} scale={180} blur={2.5} far={50} />
      <Environment preset="city" />
    </group>
  );
}

useGLTF.preload("/models/shipping-container.glb");
useGLTF.preload("/models/electric-reach-truck-1-6-t-moving-mast.glb");
useGLTF.preload("/models/container-ship-loaded.glb");
