"use client";

import { useSmoothScrollContext } from "@/context/ref-scroll";
import { Link } from "@nextui-org/react";
import { useInView } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

export const About = () => {
  const { workRef } = useSmoothScrollContext();

  const inView = useInView(workRef);

  return (
    <section
      ref={workRef}
      className="flex flex-col md:flex-row gap-x-0 gap-y-0 max-w-[1440px] py-[86px] content-container"
      aria-labelledby="about-heading"
    >
      <h2 id="about-heading" className="w-1/4 text-xl font-medium">About</h2>
      <div className="w-full lg:w-[90%] pr-0 lg:pr-[237px]">
        <p className="text-xl md:text-3xl lg:text-[34px] leading-[1.3] md:leading-[1.4]">
        I&apos;m Andrés Vélez, a Full Stack developer with over 5 years of experience working with multinational companies and
        internationally recognized brands. I specialize in developing technology
        companies and projects that generate real impact. Currently, I am
        co-founder of{" "}
        <Link
          href="https://www.norvik.tech/es"
          target="_blank"
          className="text-white text-inherit text-xl md:text-3xl lg:text-[34px] relative"
        >
          {inView && (
            <Image
              src="https://cdn.prod.website-files.com/665ea416583f76e1fde5faa5/6668891d705a2a0193a968a9_swash.svg"
              alt="Norvik Tech - Software development company"
              fill
              className="absolute !inset-y-6"
            />
          )}
          Norvik Tech
        </Link>{" "}
        &{" "}
        <Link
          href="https://ganado.co/"
          target="_blank"
          className="text-white text-inherit text-xl md:text-3xl lg:text-[34px] relative"
        >
          {inView && (
            <Image
              src="https://cdn.prod.website-files.com/665ea416583f76e1fde5faa5/6668891d705a2a0193a968a9_swash.svg"
              alt="Ganado Co - Livestock management platform"
              fill
              className="absolute !inset-y-6"
            />
          )}
          Ganado Co
        </Link>
        , where we lead technological innovation and digital transformation of
        companies across different sectors. My approach combines strategic
        vision with effective execution, building solutions that not only meet
        objectives but transform industries.
        </p>
      </div>
    </section>
  );
};
