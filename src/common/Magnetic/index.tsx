import React, { ReactElement, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  children: ReactElement;
}

export function Magnetic({ children }: Props) {
  const magnetic = useRef<HTMLElement | null>(null);
  /** Ref del hijo actual; se actualiza cada render sin meter `children` en useCallback. */
  type ChildRef = React.Ref<HTMLElement> | undefined;
  const childRefHolder = useRef<ChildRef>(undefined);

  childRefHolder.current = (children as React.ReactElement & { ref?: ChildRef }).ref;

  const setMagneticRef = useCallback((node: HTMLElement | null) => {
    magnetic.current = node;
    const childRef = childRefHolder.current;
    if (typeof childRef === "function") {
      childRef(node);
    } else if (childRef && typeof childRef === "object" && "current" in childRef) {
      (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  }, []);

  useEffect(() => {
    const element = magnetic.current;
    if (!element) return;

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

      const { height, width, left, top } = rect;
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
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
