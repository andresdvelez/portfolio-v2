"use client";

import { useState, useEffect, useRef } from "react";
import { Project } from "./Project";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { RoundedButton } from "../../common/RoundedButton";
import { projects } from "@/data/projects";
import { useSmoothScrollContext } from "@/context/ref-scroll";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export function Projects() {
  const container = useRef(null);
  const { workRef } = useSmoothScrollContext();

  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement | null>(null);
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorLabel = useRef<HTMLDivElement | null>(null);

  const xMoveContainer = useRef<gsap.QuickToFunc | null>(null);
  const yMoveContainer = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  useEffect(() => {
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x: number, y: number) => {
    xMoveContainer.current?.(x);
    yMoveContainer.current?.(y);
    xMoveCursor.current?.(x);
    yMoveCursor.current?.(y);
    xMoveCursorLabel.current?.(x);
    yMoveCursorLabel.current?.(y);
  };

  const manageModal = (
    active: boolean,
    index: number,
    x: number,
    y: number
  ) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main
      ref={container}
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
      className="flex flex-col items-center mt-[200px] content-container h-[110vh] relative z-10 bg-background"
    >
      <div className="max-w-[1400px] w-full flex flex-col items-center justify-center mb-[100px]">
        {projects.map((project, index) => {
          return (
            <Project
              index={index}
              title={project.title}
              description={project.description}
              manageModal={manageModal}
              key={index}
            />
          );
        })}
      </div>
      <div className="flex gap-5 mx-12 md:mx-[200px]">
        <RoundedButton onClick={() => {}}>
          <p className="py-1">More works</p>
        </RoundedButton>
      </div>
      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className="h-[250px] w-[300px] md:h-[350px] md:w-[400px] fixed top-1/2 left-1/2 bg-white pointer-events-none overflow-hidden z-30"
        >
          <div
            style={{ top: `${index * -100}%` }}
            className="relative h-full w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          >
            {projects.map((project, index) => {
              const { src, color, href } = project;
              return (
                <div
                  className="flex items-center justify-center h-full w-full backdrop-blur-md"
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}
                  onClick={() => console.log(href)}
                >
                  <Image
                    src={`/projects/${src}`}
                    className="pointer-events-none"
                    width={300}
                    height={0}
                    alt="image"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          className="w-[80px] h-[80px] rounded-full bg-[#455CE9] text-white fixed z-30 flex items-center justify-center text-sm font-light pointer-events-none"
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        ></motion.div>
        <motion.div
          ref={cursorLabel}
          className="w-[80px] h-[80px] rounded-full fixed z-30 flex items-center justify-center text-sm font-light pointer-events-none"
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        >
          View
        </motion.div>
      </>
      <motion.div style={{ height }} className="circleContainer">
        <div className="circle"></div>
      </motion.div>
      <div ref={workRef} className="h-3 w-3 absolute inset-80"></div>
    </main>
  );
}
