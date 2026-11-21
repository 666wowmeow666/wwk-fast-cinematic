"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Continuous cinematic camera path
const PATH = [
  { pos: new THREE.Vector3(8, 6, 55), look: new THREE.Vector3(0, 2, 40) },
  { pos: new THREE.Vector3(4, 5, 30), look: new THREE.Vector3(0, 2, 20) },
  { pos: new THREE.Vector3(-6, 7, 5), look: new THREE.Vector3(0, 2, -10) },
  { pos: new THREE.Vector3(12, 9, -25), look: new THREE.Vector3(0, 3, -45) },
  { pos: new THREE.Vector3(0, 12, -55), look: new THREE.Vector3(0, 4, -75) },
  { pos: new THREE.Vector3(-15, 18, -90), look: new THREE.Vector3(10, 5, -110) },
];

function lerpVec3(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  return new THREE.Vector3(
    a.x + (b.x - a.x) * t,
    a.y + (b.y - a.y) * t,
    a.z + (b.z - a.z) * t
  );
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
    const t = localT * localT * (3 - 2 * localT);

    const targetPos = lerpVec3(PATH[idx].pos, PATH[idx + 1].pos, t);
    const targetLook = lerpVec3(PATH[idx].look, PATH[idx + 1].look, t);

    currentPos.current.lerp(targetPos, 0.08);
    currentLook.current.lerp(targetLook, 0.08);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}
