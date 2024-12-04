"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Model from "./Model";
import clsx from "clsx";

interface Props {
  activeMenu: number | null;
  inView: boolean;
}

export default function Scene({ activeMenu, inView }: Props) {
  return (
    <div
      className={clsx("absolute top-0 h-screen w-full -z-10", {
        "!fixed": inView,
      })}
    >
      <Canvas>
        <Model activeMenu={activeMenu} />
      </Canvas>
    </div>
  );
}
