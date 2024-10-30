"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactElement } from "react";

function SmoothScrolling({ children }: { children: ReactElement }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
