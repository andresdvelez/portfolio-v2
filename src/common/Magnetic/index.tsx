import React, { ReactElement, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface Props {
  children: ReactElement;
}

export function Magnetic({ children }: Props) {
  const magnetic = useRef<HTMLElement>(null);

  const setMagneticRef = useCallback((node: HTMLElement | null) => {
    magnetic.current = node;
    
    // Preserve existing ref if child has one
    const childRef = (children as any).ref;
    if (typeof childRef === "function") {
      childRef(node);
    } else if (childRef && typeof childRef === "object" && "current" in childRef) {
      (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  }, [children]);

  useEffect(() => {
    if (!magnetic.current) return;

    const element = magnetic.current;
    const xTo = gsap.quickTo(element, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = element.getBoundingClientRect();

      if (rect) {
        const { height, width, left, top } = rect;
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.35);
        yTo(y * 0.35);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { 
    ref: setMagneticRef,
  } as any);
}
