import { menuSlide, scale, slide } from "../animation";
import { Curve } from "./Curve";
import { Footer } from "./Footer";
import { NavItem } from "@/types";
import { useSmoothScrollContext } from "@/context/ref-scroll";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  setIsActive: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
}

export function Nav({ setIsActive, isDark }: Props) {
  const { handleSmoothScroll, workRef, contactRef, homeRef } =
    useSmoothScrollContext();

  const [selectedIndicator, setSelectedIndicator] = useState<string>();

  const navItems: Array<NavItem> = [
    {
      title: "Inicio",
      ref: homeRef,
    },
    {
      title: "Proyectos",
      ref: workRef,
    },
    {
      title: "Contacto",
      ref: contactRef,
    },
  ];

  const handleLinkClick = (data: NavItem) => {
    setIsActive(false);
    if (data.title === "Proyectos") {
      window.location.href = "/work";
      return;
    }
    handleSmoothScroll(data.ref);
  };

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="menu w-screen lg:w-max z-30 h-screen"
      data-theme={isDark ? "dark" : "light"}
    >
      <div className="body p-[50px] md:p-[100px] pb-36">
        <div className="nav">
          <div className="header">
            <p className={isDark ? "text-white/60" : "text-black/60"}>
              Navegación
            </p>
          </div>
          {navItems.map((data, index) => (
            // <LinkComponent
            //   key={index}
            //   data={{ ...data, index }}
            //   isActive={selectedIndicator === data.href}
            //   setSelectedIndicator={setSelectedIndicator}
            // />
            <motion.div
              className={`relative flex items-center font-light cursor-pointer transition-colors ${
                isDark ? "text-white" : "text-black"
              }`}
              custom={index}
              key={data.title}
              variants={slide}
              onClick={() => handleLinkClick(data)}
              onMouseEnter={() => {
                setSelectedIndicator(data.title);
              }}
            >
              <motion.div
                variants={scale}
                animate={selectedIndicator === data.title ? "open" : "closed"}
                className={`absolute left-[-30px] h-2.5 w-2.5 rounded-full ${
                  isDark ? "bg-white" : "bg-black"
                }`}
              ></motion.div>
              {data.title}
            </motion.div>
          ))}
        </div>
        <Footer isDark={isDark} />
      </div>
      <Curve isDark={isDark} />
    </motion.div>
  );
}
