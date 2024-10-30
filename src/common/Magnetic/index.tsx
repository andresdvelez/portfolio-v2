import React, { ReactElement, useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  children: ReactElement;
}

export function Magnetic({ children }: Props) {
  const magnetic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    const xTo = gsap.quickTo(magnetic.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(magnetic.current, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    magnetic.current.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const rect = magnetic.current?.getBoundingClientRect();

      if (rect) {
        const { height, width, left, top } = rect;
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.35);
        yTo(y * 0.35);
      }
    });

    magnetic.current.addEventListener("mouseleave", () => {
      xTo(0);
      yTo(0);
    });

    return () => {
      magnetic.current?.removeEventListener("mousemove", () => {});
      magnetic.current?.removeEventListener("mouseleave", () => {});
    };
  }, []);

  return React.cloneElement(children, { ref: magnetic });
}
