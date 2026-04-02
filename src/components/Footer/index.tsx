"use client";

import Image from "next/image";
import { RoundedButton } from "../../common/RoundedButton";
import { useScroll, motion, useTransform, AnimatePresence } from "framer-motion";
import { Magnetic } from "../../common/Magnetic";
import { useSmoothScrollContext } from "@/context/ref-scroll";
import { useRef, useState } from "react";
import Link from "next/link";
import { ContactForm } from "../ContactForm";

export function Footer() {
  const container = useRef(null);
  const { contactRef } = useSmoothScrollContext();
  const [showContactForm, setShowContactForm] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const xMobile = useTransform(scrollYProgress, [0, 1], [0, 220]);
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
      className="relative flex min-h-[88svh] flex-col items-center justify-start bg-white pb-8 text-black md:min-h-[90svh]"
    >
      <div
        ref={contactRef}
        className="w-full max-w-[1800px] scroll-mt-28 pt-40 sm:scroll-mt-36 sm:pt-48 md:scroll-mt-40 md:pt-52 lg:pt-56 xl:pt-60"
      >
        <div className="border-b border-gray-600 pb-16 md:pb-20 mx-8 md:mx-12 lg:mx-[200px] relative">
          <span className="flex items-center">
            <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] relative rounded-full overflow-hidden grainy">
              <Image
                fill={true}
                alt="Andrés Vélez — founder of Norvik Tech"
                src={`/me.png`}
                className="object-cover object-[50%_30%] rounded-full contrast-[1.1] brightness-[0.9]"
              />
            </div>
            <h3 className="ml-3 text-4xl md:text-[5vw] font-light m-0">
              Let&apos;s work
            </h3>
          </span>
          <h3 className="text-4xl md:text-[5vw] font-light lg:mt-6">
            together
          </h3>
          <motion.div
            style={{ x: xReduced }}
            className="absolute left-[calc(100%-400px)] top-[calc(100%-75px)]"
          >
            <RoundedButton
              onClick={() => setShowContactForm(true)}
              backgroundColor="#455CE9"
              className="h-[140px] w-[140px] !p-0 text-center md:h-[180px] md:w-[180px] rounded-full border border-gray-400 !bg-white !text-black hover:!text-white"
            >
              <p className="relative z-10 m-0 whitespace-nowrap text-center text-[15px] font-light leading-none md:text-lg">
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
        <div className="mx-8 mt-16 flex w-full max-w-full flex-col items-start gap-4 md:mx-12 md:mt-20 lg:mx-[200px] lg:mt-16">
          <RoundedButton
            className="!self-start"
            onClick={() => setShowContactForm(true)}
          >
            <p>contact@andresvelez.co</p>
          </RoundedButton>
          <Link
            href="mailto:contact@andresvelez.co"
            className="inline-flex self-start"
          >
            <RoundedButton className="!self-start">
              <p>Send direct email</p>
            </RoundedButton>
          </Link>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 px-5 pb-6 pt-4 md:mt-16 md:flex-row md:pb-8">
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
                Local time
              </h3>
              <p className="cursor-pointer hover:underline">
                {colombiaTime} UTC-5
              </p>
            </span>
          </div>
          <div className="flex gap-2 flex-col">
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
                  aria-label="Andrés Vélez Instagram"
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
                  aria-label="Andrés Vélez LinkedIn"
                >
                  LinkedIn
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
      {/* Modal del formulario de contacto */}
      <AnimatePresence>
        {showContactForm && (
          <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            onClick={() => setShowContactForm(false)}
          />
          
          {/* Modal Content - Desktop: centrado, Mobile: en la parte inferior */}
          <div className="fixed inset-0 z-[9999] flex items-end lg:items-center lg:justify-center lg:p-4 pointer-events-none">
              <div className="pointer-events-auto w-full" onClick={(e) => e.stopPropagation()}>
                <ContactForm onClose={() => setShowContactForm(false)} />
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
