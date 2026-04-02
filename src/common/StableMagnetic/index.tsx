"use client";

import React, { ReactElement, useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Ref estable en un wrapper (comportamiento clásico de Magnetic). El Magnetic
 * compartido usa merge de refs con deps `[children]`, que en cada render
 * desmonta/remonta la ref y deja los listeners de GSAP en un nodo huérfano.
 * Este componente es solo para CTAs del footer (u otros casos puntuales).
 */
interface Props {
  children: ReactElement;
  className?: string;
}

export function StableMagnetic({ children, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className={className ?? "inline-flex"}>
      {children}
    </div>
  );
}
