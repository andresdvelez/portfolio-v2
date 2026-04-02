//@ts-nocheck

import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useTexture, useAspect } from "@react-three/drei";
import { popularProjects } from "@/data/projects";
import useMouse from "@/hooks/useMouse";
import * as THREE from "three";
import { fragment, vertex } from "@/utils/shader";

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

/**
 * Maps window mouse to plane position using the **canvas** rect (not innerWidth/Height).
 * The Scene canvas only covers the Portfolio section; window-space mapping skewed Y badly.
 */
export default function Model({ activeMenu }: { activeMenu: number | null }) {
  const plane = useRef<THREE.Mesh>(null);
  const smoothNorm = useRef({ x: 0.5, y: 0.5 });
  const mouse = useMouse();
  const opacity = useMotionValue(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const textures = popularProjects.map((project) => useTexture(project.src));
  const { width, height } = textures[0].image;

  const scale = useAspect(width, height, 0.16);

  useEffect(() => {
    if (!plane.current) return;

    const material = plane.current.material as THREE.ShaderMaterial;
    const peakAlpha = 0.38;
    if (activeMenu != null) {
      material.uniforms.uTexture.value = textures[activeMenu];
      animate(opacity, peakAlpha, {
        duration: 0.28,
        onUpdate: (latest) => (material.uniforms.uAlpha.value = latest),
      });
    } else {
      animate(opacity, 0, {
        duration: 0.35,
        onUpdate: (latest) => (material.uniforms.uAlpha.value = latest),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenu]);

  useFrame((state) => {
    if (!plane.current) return;

    const { viewport, gl } = state;
    const rect = gl.domElement.getBoundingClientRect();
    const rw = rect.width || 1;
    const rh = rect.height || 1;

    let nx = (mouse.x - rect.left) / rw;
    let ny = (mouse.y - rect.top) / rh;
    nx = Math.min(1, Math.max(0, nx));
    ny = Math.min(1, Math.max(0, ny));

    const sn = smoothNorm.current;
    sn.x = lerp(sn.x, nx, 0.14);
    sn.y = lerp(sn.y, ny, 0.14);

    const posX = (sn.x - 0.5) * viewport.width;
    const posY = (0.5 - sn.y) * viewport.height;

    plane.current.position.x = posX;
    plane.current.position.y = posY;

    const material = plane.current.material as THREE.ShaderMaterial;
    material.uniforms.uDelta.value = {
      x: (nx - sn.x) * viewport.width * 3,
      y: -1 * (ny - sn.y) * viewport.height * 3,
    };
  });

  const uniforms = useRef({
    uDelta: { value: { x: 0, y: 0 } },
    uAmplitude: { value: 0.0005 },
    uTexture: { value: textures[0] },
    uAlpha: { value: 0 },
  });

  return (
    <mesh ref={plane} scale={scale}>
      <planeGeometry args={[1, 1, 15, 15]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
        transparent={true}
      />
    </mesh>
  );
}
