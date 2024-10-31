"use client";

import { VelocityText } from "@/common/VelocityText";
import { useSmoothScrollContext } from "@/context/ref-scroll";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { useScroll } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const targetRef = useRef(null);

  const { homeRef } = useSmoothScrollContext();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={targetRef}
      className="w-screen content-container h-noheader relative flex items-center justify-between"
    >
      <div className=" absolute -inset-y-4 h-3" ref={homeRef}></div>
      <div className="bg-white/5 w-[300px] h-[300px] absolute  z-10 blur-3xl inset-y-80 inset-x-12 lg:inset-x-[34rem]"></div>
      <aside className="flex justify-center items-start flex-col gap-2 h-full z-20 w-1/2">
        <div className="flex items-start justify-between flex-col gap-6">
          <h1 className="text-6xl md:text-8xl -mt-32 lg:-mt-60 font-medium lg:w-max">
            Software Developer
          </h1>
          <div className="flex items-start md:items-center justify-between gap-8 flex-col md:flex-row">
            <Card className="gap-0 z-0 bg-slate-50/5 p-2" shadow="lg" isBlurred>
              <CardHeader className="p-1 px-2">
                <i
                  className="icon-[material-symbols--work]"
                  role="img"
                  aria-hidden="true"
                />
              </CardHeader>
              <CardBody className="p-1 px-2 text-sm">
                Recent Experience
              </CardBody>
              <CardFooter className="text-white/60 p-1 px-2 text-xs">
                Cofounder @ Norvik Tech
              </CardFooter>
            </Card>
            <Card className="gap-0 z-0 p-2 bg-slate-50/5" isBlurred>
              <CardHeader className="p-1 px-2">
                <i
                  className="icon-[gridicons--location]"
                  role="img"
                  aria-hidden="true"
                />
              </CardHeader>
              <CardBody className="p-1 px-2 text-sm">Location</CardBody>
              <CardFooter className="text-white/60 p-1 px-2 text-xs">
                Medellín City
              </CardFooter>
            </Card>
          </div>
        </div>
        <VelocityText
          scrollYProgress={scrollYProgress}
          text="With a T-shape skillset in design, management, and development"
          className="text-5xl lg:text-[90px] tracking-wider leading-snug font-medium absolute bottom-0 left-0 w-max font-saint-regus pl-4"
        />
      </aside>
      <Image
        width={800}
        src="/mobile-screenshot.webp"
        alt="Indahouse project mockup"
        className="z-0 hidden lg:block"
        classNames={{
          wrapper: "flex items-center justify-center",
        }}
      />
    </section>
  );
};
