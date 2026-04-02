"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees (yaw / pitch) */
  maxTilt?: number;
};

export function PortraitTilt3D({
  children,
  className = "",
  maxTilt = 16,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 320, damping: 38, mass: 0.8 });
  const smoothY = useSpring(rotateY, { stiffness: 320, damping: 38, mass: 0.8 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * 2 * maxTilt);
      rotateX.set(-py * 2 * maxTilt * 0.85);
    },
    [maxTilt, reducedMotion, rotateX, rotateY]
  );

  const onLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <div
      ref={wrapRef}
      className={`relative [perspective:1100px] ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{
          rotateX: reducedMotion ? 0 : smoothX,
          rotateY: reducedMotion ? 0 : smoothY,
          transformStyle: "preserve-3d",
        }}
        className="will-change-transform"
      >
        {/* translateZ + preserve-3d sells depth under perspective */}
        <div
          className="transform-gpu [transform-style:preserve-3d] [transform:translate3d(0,0,2.25rem)]"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
