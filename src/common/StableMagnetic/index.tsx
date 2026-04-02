"use client";

import React, { ReactElement, useEffect, useRef } from "react";
import gsap from "gsap";
import { MAGNETIC_POINTER_MEDIA } from "../magneticPointer";

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

    const mq = window.matchMedia(MAGNETIC_POINTER_MEDIA);

    const clearTransform = () => {
      gsap.set(el, { x: 0, y: 0 });
    };

    const attach = () => {
      if (!mq.matches) {
        clearTransform();
        return () => {};
      }

      const xTo = gsap.quickTo(el, "x", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
      const yTo = gsap.quickTo(el, "y", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });

      const pad = 6;
      const clamp = (n: number, min: number, max: number) =>
        Math.min(max, Math.max(min, n));

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        let x = (e.clientX - cx) * 0.35;
        let y = (e.clientY - cy) * 0.35;

        const curX = Number(gsap.getProperty(el, "x")) || 0;
        const curY = Number(gsap.getProperty(el, "y")) || 0;
        const iw = window.innerWidth;
        const ih = window.innerHeight;

        const minX = curX + pad - rect.left;
        const maxX = curX + (iw - pad - rect.right);
        const minY = curY + pad - rect.top;
        const maxY = curY + (ih - pad - rect.bottom);

        x = clamp(x, Math.min(minX, maxX), Math.max(minX, maxX));
        y = clamp(y, Math.min(minY, maxY), Math.max(minY, maxY));

        xTo(x);
        yTo(y);
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
        xTo(0);
        yTo(0);
      };
    };

    let detach = attach();

    const onMq = () => {
      detach();
      clearTransform();
      detach = attach();
    };

    mq.addEventListener("change", onMq);
    return () => {
      mq.removeEventListener("change", onMq);
      detach();
      clearTransform();
    };
  }, []);

  return (
    <div ref={rootRef} className={className ?? "inline-flex"}>
      {children}
    </div>
  );
}
