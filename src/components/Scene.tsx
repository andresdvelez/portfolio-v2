"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Model from "./Model";

interface Props {
  activeMenu: number | null;
}

/**
 * Stays contained to the parent <section>; never position:fixed viewport-wide
 * (that blocked header/nav). R3F’s inner wrapper divs must not capture hits—see globals.css .portfolio-hover-scene.
 */
export default function Scene({ activeMenu }: Props) {
  return (
    <div
      className="portfolio-hover-scene absolute inset-0 z-[2] h-full min-h-[min(90svh,920px)] w-full"
      aria-hidden
    >
      <Canvas
        className="h-full w-full touch-none"
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = "none";
        }}
      >
        <Model activeMenu={activeMenu} />
      </Canvas>
    </div>
  );
}
