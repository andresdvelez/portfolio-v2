import React, { ReactElement, useEffect, useRef } from "react";
import gsap from "gsap";
import { Magnetic } from "../Magnetic";

interface Props {
  children: ReactElement;
  backgroundColor?: string;
  onClick: () => void;
  className?: string;
}

export function RoundedButton({
  children,
  backgroundColor = "#455CE9",
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

  return (
    <Magnetic>
      <div
        className="roundedButton relative flex w-max cursor-pointer items-center justify-center self-center rounded-[3em] border border-[#888888] bg-white px-14 py-4 text-black hover:text-black"
        style={{ overflow: "hidden" }}
        onMouseEnter={() => {
          manageMouseEnter();
        }}
        onMouseLeave={() => {
          manageMouseLeave();
        }}
        {...attributes}
      >
        {children}
        <div
          ref={circle}
          style={{ backgroundColor }}
          className="absolute top-full -z-10 h-[150%] w-full rounded-[50%]"
        ></div>
      </div>
    </Magnetic>
  );
}
