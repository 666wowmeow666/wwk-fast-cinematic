"use client";

import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// More aggressive cinematic path
const PATH = [
  // Start — close on loading zone + reach truck
  { pos: new THREE.Vector3(14, 8, 70), look: new THREE.Vector3(-4, 3, 50) },
  // Move through trucks on road
  { pos: new THREE.Vector3(8, 6, 35), look: new THREE.Vector3(0, 2.5, 20) },
  // Sweep across road
  { pos: new THREE.Vector3(-10, 9, 8), look: new THREE.Vector3(2, 2, -10) },
  // Approach port
  { pos: new THREE.Vector3(18, 12, -30), look: new THREE.Vector3(0, 4, -55) },
  // High over containers
  { pos: new THREE.Vector3(5, 16, -55), look: new THREE.Vector3(0, 3, -80) },
  // Final — dramatic view of the ship
  { pos: new THREE.Vector3(-25, 22, -80), look: new THREE.Vector3(15, 6, -110) },
];

function lerpVec3(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  return new THREE.Vector3().lerpVectors(a, b, t);
}

export default function CameraController({ progress }: { progress: number }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3().copy(PATH[0].pos));
  const currentLook = useRef(new THREE.Vector3().copy(PATH[0].look));

  useFrame(() => {
    const p = Math.max(0, Math.min(1, progress));
    const segments = PATH.length - 1;
    const scaled = p * segments;
    const idx = Math.min(Math.floor(scaled), segments - 1);
    const localT = scaled - idx;
    // Smoothstep
    const t = localT * localT * (3 - 2 * localT);

    const targetPos = lerpVec3(PATH[idx].pos, PATH[idx + 1].pos, t);
    const targetLook = lerpVec3(PATH[idx].look, PATH[idx + 1].look, t);

    currentPos.current.lerp(targetPos, 0.07);
    currentLook.current.lerp(targetLook, 0.07);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}
