import React, { ReactElement, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { MAGNETIC_POINTER_MEDIA } from "../magneticPointer";

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

    const mq = window.matchMedia(MAGNETIC_POINTER_MEDIA);

    const clearTransform = () => {
      gsap.set(element, { x: 0, y: 0 });
    };

    const attach = () => {
      if (!mq.matches) {
        clearTransform();
        return () => {};
      }

      const xTo = gsap.quickTo(element, "x", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
      const yTo = gsap.quickTo(element, "y", {
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });

      const pad = 6;
      const clamp = (n: number, min: number, max: number) =>
        Math.min(max, Math.max(min, n));

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = element.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        let x = (clientX - cx) * 0.35;
        let y = (clientY - cy) * 0.35;

        const curX = Number(gsap.getProperty(element, "x")) || 0;
        const curY = Number(gsap.getProperty(element, "y")) || 0;
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

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
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

  return React.cloneElement(children, {
    ref: setMagneticRef,
  } as any);
}
