"use client";

import { AnimatePresence } from "framer-motion";
import { Nav } from "./nav";
import { RoundedButton } from "../../common/RoundedButton";
import { Magnetic } from "../../common/Magnetic";
import clsx from "clsx";
import { useHeader } from "./header.hook";
import { useSmoothScrollContext } from "@/context/ref-scroll";

export const Header = () => {
  const { header, button, setIsActive, isActive } = useHeader();

  const { handleSmoothScroll, workRef, contactRef } = useSmoothScrollContext();

  const HeaderLinks = [
    {
      title: "Work",
      ref: workRef,
    },
    {
      title: "Contact",
      ref: contactRef,
    },
  ];

  return (
    <>
      <div
        ref={header}
        className=" top-0 z-10 flex w-full items-center justify-between p-9 font-light"
      >
        <div className="flex cursor-pointer group">
          <p className="transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)] mr-2 group-hover:-rotate-[360deg]">
            ©
          </p>
          <div className="relative ml-1 flex overflow-hidden whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)]">
            <div className=" flex overflow-hidden whitespace-nowrap">
              <p className="transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)] group-hover:-translate-x-[65px]">
                Code by
              </p>
              <p className="pl-[0.3em] transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)] group-hover:-translate-x-[65px]">
                Andrés
              </p>
              <p className="absolute left-[120px] pl-[0.3em] transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)] group-hover:-translate-x-[65px]">
                Vélez
              </p>
            </div>
          </div>
        </div>
        <div className="md:flex items-center hidden">
          {HeaderLinks.map((item) => (
            <Magnetic key={item.title}>
              <div
                className="relative z-10 flex flex-col px-4 py-3 cursor-pointer hover:scale-105 group"
                onClick={() => handleSmoothScroll(item.ref)}
              >
                <a>{item.title}</a>
                <div className="absolute top-11 left-1/2 h-1 w-1 bg-foreground rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-200 ease-[cubic-bezier(0.76, 0, 0.24, 1)]"></div>
              </div>
            </Magnetic>
          ))}
        </div>
      </div>
      <div ref={button} className="headerButtonContainer">
        <RoundedButton
          onClick={() => {
            setIsActive(!isActive);
          }}
          className="button"
        >
          <div
            className={clsx("burger", {
              burgerActive: isActive,
            })}
          ></div>
        </RoundedButton>
      </div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>
    </>
  );
};
