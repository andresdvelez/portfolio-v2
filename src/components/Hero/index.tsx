"use client";

import { useSmoothScrollContext } from "@/context/ref-scroll";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Chip,
  Link,
} from "@nextui-org/react";
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
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={targetRef}
      className="h-screen flex flex-col justify-center items-center relative overflow-hidden"
    >
      <div className="absolute -inset-y-4 h-3 w-3" ref={homeRef}></div>

      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent"></div>

      <motion.div
        style={{ opacity }}
        className="w-full max-w-[1300px] mx-auto px-6 md:px-8 lg:px-12 relative z-10"
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
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
              AVAILABLE FOR WORK
            </span>
          </Chip>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5 md:space-y-6"
          >
            {/* Main Title */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
                Hi, I&apos;m a
                <br />
                <span className="text-white/90">Full Stack</span>
                <br />
                developer
                <span className="text-white/30 text-4xl md:text-5xl">©</span>
              </h1>

              <p className="text-sm md:text-base text-white/50 max-w-[480px] font-light leading-relaxed">
                With over 5 years of experience working with multinational
                companies and recognized brands, building impactful technology
                solutions
              </p>
            </div>

            {/* Contact Button */}
            <div>
              <button
                onClick={handleContact}
                className="group relative inline-flex items-center justify-center px-6 md:px-7 py-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-full overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12]"
              >
                <span className="relative z-10 text-white font-medium text-sm">
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
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Profile Image */}
              <motion.div style={{ y: y2 }} className="space-y-3">
                <div className="relative group">
                  {/* Image container with subtle border */}
                  <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden p-2 transition-all duration-300 group-hover:border-white/[0.12]">
                    <Image
                      src="/me.png"
                      alt="Andrés Vélez - Full Stack Software Developer"
                      width={300}
                      height={300}
                      className="w-full h-auto grainy"
                      classNames={{
                        wrapper: "w-full !max-w-full",
                        img: "object-cover w-full h-auto rounded-xl",
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right side: Brands Card + Social + Location */}
              <div className="space-y-3">
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
                    <CardBody className="p-4 space-y-3">
                      <div className="space-y-2">
                        <p className="text-xs text-white/60 font-light">
                          The most recent brands
                        </p>
                        <p className="text-sm text-white/80 font-light">
                          I happily worked with ❤️
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link
                          href="https://www.norvik.tech/es"
                          target="_blank"
                          className="text-white/50 hover:text-white/90 transition-all duration-300 font-bold text-xs tracking-wider"
                        >
                          NORVIK TECH
                        </Link>
                        <Link
                          href="https://ganado.co"
                          target="_blank"
                          className="text-white/50 hover:text-white/90 transition-all duration-300 font-bold text-xs tracking-wider"
                        >
                          GANADO CO
                        </Link>
                        <Link
                          href="https://blooma.io"
                          target="_blank"
                          className="text-white/50 hover:text-white/90 transition-all duration-300 font-bold text-xs tracking-wider"
                        >
                          BLOOMA
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>

                {/* Social Icons Grid */}
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    href="https://www.linkedin.com/in/andres-velez-su/"
                    target="_blank"
                    isExternal
                  >
                    <div className="w-full aspect-square rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 group">
                      <i className="icon-[mdi--linkedin] text-white/50 group-hover:text-white text-lg transition-colors duration-300"></i>
                    </div>
                  </Link>
                  <Link
                    href="https://www.instagram.com/andresvelezs/"
                    target="_blank"
                    isExternal
                  >
                    <div className="w-full aspect-square rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 group">
                      <i className="icon-[mdi--instagram] text-white/50 group-hover:text-white text-lg transition-colors duration-300"></i>
                    </div>
                  </Link>
                  <Link
                    href="https://github.com/andresvelez"
                    target="_blank"
                    isExternal
                  >
                    <div className="w-full aspect-square rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 group">
                      <i className="icon-[mdi--github] text-white/50 group-hover:text-white text-lg transition-colors duration-300"></i>
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
                    <CardBody className="p-3 flex flex-row items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center backdrop-blur-xl">
                        <i className="icon-[mdi--map-marker] text-green-400 text-base"></i>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 mb-0">
                          Location
                        </p>
                        <p className="text-xs font-medium text-white">
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
