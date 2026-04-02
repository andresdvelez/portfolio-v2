"use client";

import { useSmoothScrollContext } from "@/context/ref-scroll";
import { Card, CardBody, Image, Chip, Link } from "@nextui-org/react";
import NextImage from "next/image";
import { useRef } from "react";
import { useScroll, motion, useTransform, useReducedMotion } from "framer-motion";
import { PortraitTilt3D } from "./PortraitTilt3D";

export const Hero = () => {
  const targetRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { homeRef, workRef, contactRef } = useSmoothScrollContext();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  // Hold full opacity longer while leaving the hero; fade only in the last ~35% of exit scroll
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.62, 1],
    [1, 1, 0]
  );

  const handleContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={targetRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-24 max-lg:pt-40 lg:h-screen lg:py-0"
    >
      <div className="absolute -inset-y-4 h-3 w-3" ref={homeRef}></div>

      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent"></div>

      <motion.div
        style={{ opacity }}
        className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10"
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 md:mb-6 lg:mb-8"
        >
          <Chip
            variant="flat"
            size="lg"
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] px-4 py-2"
            startContent={
              <div className="mr-2 h-2 w-2 shrink-0 rounded-full bg-green-500 animate-pulse" />
            }
          >
            <span className="text-white/80 text-xs font-light tracking-wide md:text-sm">
              FOUNDER @ NORVIK · OPEN TO SELECT COLLABS
            </span>
          </Chip>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 md:space-y-5 lg:space-y-6"
          >
            {/* Main Title */}
            <div className="space-y-2 md:space-y-3">
              <h1 className="font-medium leading-[1.1] tracking-tight">
                <span className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 md:gap-x-4">
                  <span className="text-3xl text-white/90 sm:text-4xl md:text-5xl lg:text-6xl">
                    Andrés Vélez
                  </span>
                  <span
                    className="relative inline-flex shrink-0 items-center justify-center [perspective:320px]"
                    aria-hidden
                  >
                    <motion.span
                      className="inline-block origin-center will-change-transform [transform-style:preserve-3d]"
                      animate={
                        prefersReducedMotion
                          ? { rotateX: 0, rotateY: 0, rotateZ: 0, z: 0 }
                          : {
                              rotateY: [0, 26, 0, -26, 0],
                              rotateX: [0, 14, 0, -14, 0],
                              rotateZ: [0, -8, 0, 8, 0],
                              z: [0, 10, 0, 6, 0],
                            }
                      }
                      transition={{
                        duration: 7.5,
                        repeat: Infinity,
                        ease: [0.42, 0, 0.58, 1],
                      }}
                    >
                      <NextImage
                        src="/Grupo-6469.webp"
                        alt=""
                        width={80}
                        height={80}
                        className="h-[1.35rem] w-auto object-contain brightness-0 invert sm:h-[1.65rem] md:h-[2rem] lg:h-[2.35rem]"
                      />
                    </motion.span>
                  </span>
                </span>
                <span className="mt-2 block text-2xl font-light text-white/70 sm:mt-2.5 sm:text-3xl md:text-4xl lg:mt-3 lg:text-[2.75rem]">
                  Founder · Engineer
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-white/50 max-w-[520px] font-light leading-relaxed">
                I created{" "}
                <Link
                  href="https://www.norvik.tech/es"
                  target="_blank"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Norvik Tech
                </Link>{" "}
                to ship ambitious software: applied AI and deep learning, Web3
                and tokenized products where they earn their place, and
                full-stack platforms you can scale. This is my public notebook and
                proof of work—paired with open source on GitHub.
              </p>
            </div>

            {/* Contact Button */}
            <div>
              <button
                onClick={handleContact}
                className="group relative inline-flex items-center justify-center px-5 md:px-6 lg:px-7 py-2.5 md:py-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-full overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12]"
              >
                <span className="relative z-10 text-white font-medium text-xs sm:text-sm">
                  Contact me
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-3 md:space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {/* Profile Image */}
              <motion.div style={{ y: y2 }} className="space-y-3">
                <PortraitTilt3D className="mx-auto w-full max-w-[320px] sm:max-w-none">
                  <div className="relative rounded-2xl border border-white/[0.1] bg-white/[0.03] p-2 shadow-[0_28px_56px_-16px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-white/[0.16] hover:shadow-[0_32px_64px_-14px_rgba(0,0,0,0.6)]">
                    <div className="flex min-h-[220px] items-center justify-center rounded-xl bg-black px-4 py-4 sm:min-h-[260px] md:py-5 md:px-5">
                      <Image
                        src="/me.png"
                        alt="Andrés Vélez — founder of Norvik Tech, engineer"
                        width={300}
                        height={300}
                        className="w-full h-auto grainy"
                        classNames={{
                          wrapper:
                            "w-[82%] max-w-[260px] mx-auto !max-w-[260px]",
                          img: "object-cover object-[50%_30%] w-full h-auto rounded-xl !max-h-[280px]",
                        }}
                      />
                    </div>
                  </div>
                </PortraitTilt3D>
              </motion.div>

              {/* Right side: Brands Card + Social + Location */}
              <div className="space-y-2.5 md:space-y-3">
                {/* Brands Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Card
                    className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.12] transition-all duration-300"
                    isBlurred
                    shadow="none"
                  >
                    <CardBody className="p-3 md:p-4 space-y-2 md:space-y-3">
                      <div className="space-y-1 md:space-y-2">
                        <p className="text-[10px] md:text-xs text-white/60 font-light">
                          Norvik portfolio highlights
                        </p>
                        <p className="text-xs md:text-sm text-white/80 font-light">
                          Products we architected end-to-end
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link
                          href="https://palmapp.co/"
                          target="_blank"
                          className="text-white/50 hover:text-white/90 transition-all duration-300 font-bold text-xs tracking-wider"
                        >
                          PALMAPP · AI / CV
                        </Link>
                        <Link
                          href="https://semsei.io/"
                          target="_blank"
                          className="text-white/50 hover:text-white/90 transition-all duration-300 font-bold text-xs tracking-wider"
                        >
                          SEMSEI · GEN AI SEO
                        </Link>
                        <Link
                          href="https://ganado.co"
                          target="_blank"
                          className="text-white/50 hover:text-white/90 transition-all duration-300 font-bold text-xs tracking-wider"
                        >
                          GANADO.CO
                        </Link>
                        <Link
                          href="https://indahouse.com.co/"
                          target="_blank"
                          className="text-white/50 hover:text-white/90 transition-all duration-300 font-bold text-xs tracking-wider"
                        >
                          INDAHOUSE · PROPTECH
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>

                {/* Social Icons Grid */}
                <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                  <Link
                    href="https://www.linkedin.com/in/andres-velez-su/"
                    target="_blank"
                    isExternal
                  >
                    <div className="w-full aspect-square rounded-lg md:rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 group">
                      <i className="icon-[mdi--linkedin] text-white/50 group-hover:text-white text-base md:text-lg transition-colors duration-300"></i>
                    </div>
                  </Link>
                  <Link
                    href="https://www.instagram.com/andresvelezs/"
                    target="_blank"
                    isExternal
                  >
                    <div className="w-full aspect-square rounded-lg md:rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 group">
                      <i className="icon-[mdi--instagram] text-white/50 group-hover:text-white text-base md:text-lg transition-colors duration-300"></i>
                    </div>
                  </Link>
                  <Link
                    href="https://github.com/andresvelez"
                    target="_blank"
                    isExternal
                  >
                    <div className="w-full aspect-square rounded-lg md:rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 group">
                      <i className="icon-[mdi--github] text-white/50 group-hover:text-white text-base md:text-lg transition-colors duration-300"></i>
                    </div>
                  </Link>
                </div>

                {/* Location Card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Card
                    className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300"
                    isBlurred
                    shadow="none"
                  >
                    <CardBody className="p-2.5 md:p-3 flex flex-row items-center gap-2">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center backdrop-blur-xl">
                        <i className="icon-[mdi--map-marker] text-green-400 text-sm md:text-base"></i>
                      </div>
                      <div>
                        <p className="text-[9px] md:text-[10px] text-white/40 mb-0">
                          Location
                        </p>
                        <p className="text-[11px] md:text-xs font-medium text-white">
                          Medellín, CO
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
