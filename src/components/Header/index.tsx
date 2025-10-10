"use client";

import { AnimatePresence } from "framer-motion";
import { Nav } from "./nav";
import { RoundedButton } from "../../common/RoundedButton";
import { Magnetic } from "../../common/Magnetic";
import clsx from "clsx";
import { useHeader } from "./header.hook";
import { useSmoothScrollContext } from "@/context/ref-scroll";
import { useHeaderTheme } from "@/hooks/useHeaderTheme";

export const Header = () => {
  const { header, button, setIsActive, isActive } = useHeader();
  const isDark = useHeaderTheme();

  const { handleSmoothScroll, workRef, contactRef, homeRef } =
    useSmoothScrollContext();

  const HeaderLinks = [
    {
      title: "Proyectos",
      ref: workRef,
    },
    {
      title: "Contacto",
      ref: contactRef,
    },
  ];

  return (
    <>
      <div
        ref={header}
        className={clsx(
          "dynamic-header-theme fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-4 font-light backdrop-blur-md rounded-full shadow-lg w-[90%] max-w-[1200px] transition-colors duration-300",
          isDark
            ? "bg-white/10 border border-white/[0.15] text-white"
            : "bg-black/30 border border-black/[0.3] text-black"
        )}
      >
        <div
          className="flex cursor-pointer group"
          onClick={() => {
            if (
              typeof window !== "undefined" &&
              window.location.pathname !== "/"
            ) {
              window.location.href = "/";
            } else {
              handleSmoothScroll(homeRef);
            }
          }}
        >
          <p className="transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)] mr-2 group-hover:-rotate-[360deg]">
            ©
          </p>
          <div className="relative ml-1 w-[125px] flex overflow-hidden whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)]">
            <div className="flex whitespace-nowrap">
              <p className="transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)] group-hover:-translate-x-[130px]">
                Andrés
              </p>
              <p className="pl-[0.3em] transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)] group-hover:-translate-x-[130px]">
                Vélez
              </p>
              <p className="absolute left-[130px] pl-[0.3em] transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)] group-hover:-translate-x-[130px]">
                Developer
              </p>
            </div>
          </div>
        </div>
        <div className="lg:flex items-center hidden">
          {HeaderLinks.map((item) => (
            <Magnetic key={item.title}>
              <div
                className="relative z-10 flex flex-col px-4 py-3 cursor-pointer hover:scale-105 group"
                onClick={() => handleSmoothScroll(item.ref)}
              >
                {item.title}
                <div className="absolute top-11 left-1/2 h-1 w-1 bg-foreground rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-200 ease-[cubic-bezier(0.76, 0, 0.24, 1)]"></div>
              </div>
            </Magnetic>
          ))}
        </div>
      </div>
      <div
        ref={button}
        className="headerButtonContainer"
        data-theme={isDark ? "dark" : "light"}
      >
        <RoundedButton
          onClick={() => {
            setIsActive(!isActive);
          }}
          className="button backdrop-blur-md rounded-full shadow-lg transition-colors duration-300 bg-white/10 border border-white/[0.15] text-white"
        >
          <div
            className={clsx("burger", {
              burgerActive: isActive,
            })}
          ></div>
        </RoundedButton>
      </div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} isDark={isDark} />}
      </AnimatePresence>
    </>
  );
};
