//@ts-nocheck

import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { useTexture, useAspect } from "@react-three/drei";
import { projects } from "@/data/projects";
import useDimension from "@/hooks/useDimensions";
import useMouse from "@/hooks/useMouse";
import * as THREE from "three";
import { fragment, vertex } from "@/utils/shader";

export default function Model({ activeMenu }: { activeMenu: number | null }) {
  const plane = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const dimension = useDimension();
  const mouse = useMouse();
  const opacity = useMotionValue(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const textures = projects.map((project) => useTexture(project.src));
  const { width, height } = textures[0].image;
  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const scale = useAspect(width, height, 0.225);
  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  useEffect(() => {
    if (!plane.current) return;

    const material = plane.current.material as THREE.ShaderMaterial;
    if (activeMenu != null) {
      material.uniforms.uTexture.value = textures[activeMenu];
      animate(opacity, 1, {
        duration: 0.2,
        onUpdate: (latest) => (material.uniforms.uAlpha.value = latest),
      });
    } else {
      animate(opacity, 0, {
        duration: 0.2,
        onUpdate: (latest) => (material.uniforms.uAlpha.value = latest),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenu]);

  useFrame(() => {
    if (!plane.current) return;

    const material = plane.current.material as THREE.ShaderMaterial;
    const { x, y } = mouse;
    const smoothX = smoothMouse.x.get();
    const smoothY = smoothMouse.y.get();

    if (Math.abs(x - smoothX) > 1) {
      smoothMouse.x.set(lerp(smoothX, x, 0.1));
      smoothMouse.y.set(lerp(smoothY, y, 0.1));
      material.uniforms.uDelta.value = {
        x: x - smoothX,
        y: -1 * (y - smoothY),
      };
    }
  });

  const uniforms = useRef({
    uDelta: { value: { x: 0, y: 0 } },
    uAmplitude: { value: 0.0005 },
    uTexture: { value: textures[0] },
    uAlpha: { value: 0 },
  });

  const { width: viewportWidth = 1, height: viewportHeight = 1 } =
    viewport || {};
  const { width: dimensionWidth = 1, height: dimensionHeight = 1 } =
    dimension || {};

  const x = useTransform(
    smoothMouse.x,
    [0, dimensionWidth],
    [(-1 * viewportWidth) / 2, viewportWidth / 2]
  );
  const y = useTransform(
    smoothMouse.y,
    [0, dimensionHeight],
    [viewportHeight / 2, (-1 * viewportHeight) / 2]
  );

  return (
    <motion.mesh position-x={x} position-y={y} ref={plane} scale={scale}>
      <planeGeometry args={[1, 1, 15, 15]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
        transparent={true}
      />
    </motion.mesh>
  );
}
