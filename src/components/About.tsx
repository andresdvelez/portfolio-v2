"use client";

import { Link } from "@nextui-org/react";
import { useInView } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

export const About = () => {
  const aboutContainer = useRef(null);

  const inView = useInView(aboutContainer);

  return (
    <section
      ref={aboutContainer}
      className="flex flex-col md:flex-row gap-x-0 gap-y-0 max-w-[1440px] py-[86px] content-container"
    >
      <p className="w-1/4 text-xl">About</p>
      <p className="w-full lg:w-[90%] pr-0 lg:pr-[237px] text-xl md:text-3xl lg:text-[34px] leading-[1.3] md:leading-[1.4]">
        Over 4 years of expertise crafting and expanding user-focused products.
        Presently, I am building development teams around the world, I am
        co-founder of{" "}
        <Link
          href="https://www.norvik.tech/es"
          target="_blank"
          className="text-white text-inherit text-xl md:text-3xl lg:text-[34px] relative"
        >
          {inView && (
            <Image
              src="https://cdn.prod.website-files.com/665ea416583f76e1fde5faa5/6668891d705a2a0193a968a9_swash.svg"
              alt=""
              fill
              className="absolute !inset-y-6"
            />
          )}
          Norvik Tech
        </Link>{" "}
        &{" "}
        <Link
          href="https://blooma.io/"
          target="_blank"
          className="text-white text-inherit text-xl md:text-3xl lg:text-[34px] relative"
        >
          {inView && (
            <Image
              src="https://cdn.prod.website-files.com/665ea416583f76e1fde5faa5/6668891d705a2a0193a968a9_swash.svg"
              alt=""
              fill
              className="absolute !inset-y-6"
            />
          )}
          Blooma io
        </Link>
      </p>
    </section>
  );
};
