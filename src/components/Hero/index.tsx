"use client";

import { useSmoothScrollContext } from "@/context/ref-scroll";
import { Card, CardBody, Image, Chip, Link } from "@nextui-org/react";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

export const Hero = () => {
  const targetRef = useRef(null);

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
      className="min-h-screen lg:h-screen flex flex-col justify-center items-center relative overflow-hidden py-24 lg:py-0"
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
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
            }
          >
            <span className="text-white/80 text-xs md:text-sm font-light tracking-wide">
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
                <span className="text-white/90">Andrés Vélez</span>
                <br />
                <span className="text-white/70 text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light">
                  Founder · Engineer · Writer
                </span>
                <span className="text-white/30 text-3xl sm:text-4xl md:text-5xl align-top">
                  {" "}
                  ©
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
                <div className="relative group">
                  {/* Image container with subtle border */}
                  <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden p-2 transition-all duration-300 group-hover:border-white/[0.12]">
                    <div className="rounded-xl bg-black flex items-center justify-center py-4 px-4 md:py-5 md:px-5 min-h-[220px] sm:min-h-[260px]">
                      <Image
                        src="/me.png"
                        alt="Andrés Vélez — founder of Norvik Tech, engineer and writer"
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
                </div>
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
