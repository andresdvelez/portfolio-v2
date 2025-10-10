"use client";

import { useRef, useState } from "react";
import { RoundedButton } from "../../common/RoundedButton";
import { popularProjects } from "@/data/projects";
import { useSmoothScrollContext } from "@/context/ref-scroll";
import Scene from "../Scene";
import { useInView } from "framer-motion";

export function Projects() {
  const topRightCornerRef = useRef(null);

  const inView = useInView(topRightCornerRef);

  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  return (
    <section className="flex flex-col items-center mt-[100px] pb-24 md:pb-28 content-container z-10 bg-background min-h-[80svh] gap-2 relative">
      <p className="text-xl text-start w-full">Featured projects</p>
      <div
        ref={topRightCornerRef}
        className="relative mix-blend-difference z-10 text-white w-full mb-8"
      >
        <ul
          onMouseLeave={() => {
            setActiveMenu(null);
          }}
          className="border-b"
        >
          {popularProjects.map((project, i) => {
            return (
              <li
                onMouseOver={() => {
                  setActiveMenu(i);
                }}
                key={project.title}
                className="text-[4vw] p-5 border-t"
              >
                <p>{project.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <Scene inView={inView} activeMenu={activeMenu} />
      <div className="flex gap-5 mx-12 md:mx-[200px] mb-16 md:mb-24">
        <RoundedButton
          onClick={() => {
            window.location.href = "/work";
          }}
        >
          <p className="py-1">More works</p>
        </RoundedButton>
      </div>
      {/* <div ref={workRef} className="h-3 w-3 absolute inset-0 bg-red-500"></div> */}
    </section>
  );
}
