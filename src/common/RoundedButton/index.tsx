import React, { ReactElement, useEffect, useRef } from "react";
import gsap from "gsap";
import clsx from "clsx";
import { Magnetic } from "../Magnetic";

interface Props {
  children: ReactElement;
  backgroundColor?: string;
  onClick?: () => void;
  className?: string;
  /** Sin Magnetic interno (p. ej. cuando el padre usa StableMagnetic). */
  disableMagnetic?: boolean;
  /**
   * `pill`: halo ancho como en el diseño original (GSAP top/width encajan con w-full).
   * `circle`: halo centrado cuadrado para botones redondos (header, Get in touch).
   */
  hoverFillVariant?: "pill" | "circle";
}

export function RoundedButton({
  children,
  backgroundColor = "#455CE9",
  onClick,
  className,
  disableMagnetic = false,
  hoverFillVariant = "pill",
  ...attributes
}: Props) {
  const circle = useRef(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
        "enter"
      )
      .to(
        circle.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit"
      );
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeline.current?.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      timeline.current?.play();
    }, 300);
  };

  const inner = (
    <div
      className={clsx(
        "roundedButton relative flex w-max cursor-pointer items-center justify-center self-center rounded-[3em] border border-gray-300 bg-white px-14 py-4 text-black hover:text-white",
        className
      )}
      style={{ overflow: "hidden" }}
      onMouseEnter={() => {
        manageMouseEnter();
      }}
      onMouseLeave={() => {
        manageMouseLeave();
      }}
      onClick={onClick}
      {...attributes}
    >
      {children}
      <div
        ref={circle}
        style={{ backgroundColor }}
        className={
          hoverFillVariant === "circle"
            ? "pointer-events-none absolute left-1/2 top-full -z-10 aspect-square w-[55%] -translate-x-1/2 rounded-full"
            : "pointer-events-none absolute top-full -z-10 h-[150%] w-full rounded-[50%]"
        }
      />
    </div>
  );

  if (disableMagnetic) {
    return inner;
  }

  return <Magnetic>{inner}</Magnetic>;
}
