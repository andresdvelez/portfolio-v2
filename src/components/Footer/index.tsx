"use client";

import Image from "next/image";
import { RoundedButton } from "../../common/RoundedButton";
import { useScroll, motion, useTransform } from "framer-motion";
import { Magnetic } from "../../common/Magnetic";
import { useSmoothScrollContext } from "@/context/ref-scroll";
import { useRef } from "react";
import Link from "next/link";

export function Footer() {
  const container = useRef(null);
  const { contactRef } = useSmoothScrollContext();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const xMobile = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const xDesktop = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  const xReduced = isMobile ? xMobile : xDesktop;

  const colombiaTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Bogota",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <motion.div
      style={{ y }}
      ref={container}
      className="text-black flex flex-col items-center justify-center bg-white relative"
    >
      <div className="pt-[200px] w-full max-w-[1800px]">
        <div className="border-b border-gray-600 pb-[100px] mx-12 lg:mx-[200px] relative">
          <span className="flex items-center">
            <div className="w-[100px] h-[100px] relative rounded-full overflow-hidden">
              <Image fill={true} alt={"image"} src={`/personal.webp`} />
            </div>
            <h3 className="ml-3 text-2xl md:text-[5vw] font-light m-0">
              Let&apos;s work
            </h3>
          </span>
          <h3 className="text-2xl md:text-[5vw] font-light lg:mt-6">
            together
          </h3>
          <motion.div
            style={{ x: xReduced }}
            className="absolute left-[calc(100%-400px)] top-[calc(100%-75px)]"
          >
            <RoundedButton
              onClick={() => {}}
              backgroundColor={"#334BD3"}
              className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] bg-[#455CE9] text-white rounded-full flex items-center justify-center cursor-pointer relative overflow-hidden"
            >
              <p className="m-0 text-lg font-light relative z-10">
                Get in touch
              </p>
            </RoundedButton>
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[30%] left-full"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="#000"
            />
          </motion.svg>
        </div>
        <div className="flex gap-5 mt-[160px] lg:mt-[100px] mx-12 lg:mx-[200px] self-start">
          <RoundedButton onClick={() => {}}>
            <p>advelezs@gmail.com</p>
          </RoundedButton>
        </div>
        <div className="flex justify-between mt-20 md:mt-[200px] p-5 flex-col md:flex-row">
          <div className="flex gap-6 items-end">
            <span className="flex flex-col gap-3.5">
              <h3 className="text-gray-500 cursor-default font-light text-base">
                Version
              </h3>
              <p className="cursor-pointer hover:underline">
                {new Date().getFullYear()} © Edition
              </p>
            </span>
            <span className="flex flex-col gap-3.5">
              <h3 className="text-gray-500 cursor-default font-light text-base">
                Current hour
              </h3>
              <p className="cursor-pointer hover:underline">
                {colombiaTime} UTC-2
              </p>
            </span>
          </div>
          <div className="flex gap-2  flex-col">
            <span className="flex flex-col gap-3.5">
              <h3 className="text-gray-500 cursor-default font-light text-base">
                Socials
              </h3>
            </span>
            <div className="flex gap-2">
              <Magnetic>
                <Link
                  target="_blank"
                  href="https://www.instagram.com/andresvelezs/"
                  className="cursor-pointer hover:underline"
                >
                  Instagram
                </Link>
              </Magnetic>
              {/* <Magnetic>
              <p className="cursor-pointer hover:underline">Dribbble</p>
            </Magnetic> */}
              <Magnetic>
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/andres-velez-su/"
                  className="cursor-pointer hover:underline"
                >
                  Linkedin
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
      <div ref={contactRef}></div>
    </motion.div>
  );
}
