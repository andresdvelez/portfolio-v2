"use client";

import { AnimatePresence } from "framer-motion";
import { Nav } from "./nav";
import { RoundedButton } from "../../common/RoundedButton";
import { Magnetic } from "../../common/Magnetic";
import clsx from "clsx";
import { useHeader } from "./header.hook";
import { useSmoothScrollContext } from "@/context/ref-scroll";
import { useHeaderTheme } from "@/hooks/useHeaderTheme";
import Link from "next/link";
import { useEffect, useState } from "react";

const SCROLL_CONTAINER_THRESHOLD_PX = 16;

export const Header = () => {
  const { header, button, setIsActive, isActive } = useHeader();
  const isDark = useHeaderTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sync = () => {
      setIsScrolled(window.scrollY > SCROLL_CONTAINER_THRESHOLD_PX);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

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
          "dynamic-header-theme fixed left-4 z-50 flex items-center font-light duration-300 sm:left-6",
          "w-[calc(100%-124px)] sm:w-[calc(100%-140px)] md:w-[calc(100%-180px)]",
          "transition-[background-color,border-color,box-shadow,backdrop-filter,padding,border-radius]",
          /* Móvil / tablet: alineado al menú; sin card arriba del todo */
          "max-lg:top-[26px] max-lg:justify-start",
          isScrolled
            ? [
                "max-lg:h-auto max-lg:min-h-[3.25rem] max-lg:max-h-20 max-lg:rounded-full max-lg:border max-lg:px-3 max-lg:py-2 max-lg:backdrop-blur-xl max-lg:shadow-[0_8px_32px_rgba(0,0,0,0.18)]",
                isDark
                  ? "max-lg:border-white/[0.12] max-lg:bg-white/[0.08]"
                  : "max-lg:border-black/[0.1] max-lg:bg-black/[0.06]",
              ]
            : "max-lg:h-20 max-lg:rounded-none max-lg:border-0 max-lg:bg-transparent max-lg:p-0 max-lg:shadow-none max-lg:backdrop-blur-none",
          /* Desktop: barra centrada (siempre con contenedor) */
          "lg:top-6 lg:left-1/2 lg:h-auto lg:max-w-[1200px] lg:w-[90%] lg:-translate-x-1/2 lg:justify-between lg:rounded-full lg:border lg:border-white/[0.08] lg:bg-white/[0.03] lg:px-6 lg:py-4 lg:backdrop-blur-xl lg:shadow-none",
          isDark ? "text-white" : "text-black"
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
                Founder
              </p>
            </div>
          </div>
        </div>
        <nav className="lg:flex items-center hidden" aria-label="Main navigation">
          {HeaderLinks.map((item) => (
            <Magnetic key={item.title}>
              {item.title === "Proyectos" ? (
                <Link
                  href="/work"
                  className="relative z-10 flex flex-col px-4 py-3 cursor-pointer hover:scale-105 group"
                  aria-label={`Navigate to ${item.title} page`}
                >
                  {item.title}
                  <div className="absolute top-11 left-1/2 h-1 w-1 bg-foreground rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-200 ease-[cubic-bezier(0.76, 0, 0.24, 1)]"></div>
                </Link>
              ) : (
                <div
                  className="relative z-10 flex flex-col px-4 py-3 cursor-pointer hover:scale-105 group"
                  onClick={() => handleSmoothScroll(item.ref)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSmoothScroll(item.ref);
                    }
                  }}
                  aria-label={`Scroll to ${item.title} section`}
                >
                  {item.title}
                  <div className="absolute top-11 left-1/2 h-1 w-1 bg-foreground rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-200 ease-[cubic-bezier(0.76, 0, 0.24, 1)]"></div>
                </div>
              )}
            </Magnetic>
          ))}
        </nav>
      </div>
      <div
        ref={button}
        className="headerButtonContainer lg:hidden"
        data-theme={isDark ? "dark" : "light"}
      >
        <RoundedButton
          onClick={() => {
            setIsActive(!isActive);
          }}
          hoverFillVariant="circle"
          className="button !flex !h-20 !w-20 !min-h-20 !min-w-20 !max-h-20 !max-w-20 shrink-0 !rounded-full !p-0 !px-0 !py-0 backdrop-blur-md shadow-lg transition-colors duration-300 bg-white/10 !border !border-white/[0.15] text-white"
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
