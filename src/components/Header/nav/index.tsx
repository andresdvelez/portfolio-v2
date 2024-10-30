import { menuSlide, scale, slide } from "../animation";
import { Curve } from "./Curve";
import { Footer } from "./Footer";
import { NavItem } from "@/types";
import { useSmoothScrollContext } from "@/context/ref-scroll";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export function Nav({ setIsActive }: Props) {
  const { handleSmoothScroll, workRef, contactRef, homeRef } =
    useSmoothScrollContext();

  const [selectedIndicator, setSelectedIndicator] = useState<string>();

  const navItems: Array<NavItem> = [
    {
      title: "Home",
      ref: homeRef,
    },
    {
      title: "Work",
      ref: workRef,
    },
    {
      title: "Contact",
      ref: contactRef,
    },
  ];

  const handleLinkClick = (data: NavItem) => {
    setIsActive(false);
    handleSmoothScroll(data.ref);
  };

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="menu w-screen lg:w-max z-30"
    >
      <div className="body">
        <div className="nav">
          <div className="header">
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => (
            // <LinkComponent
            //   key={index}
            //   data={{ ...data, index }}
            //   isActive={selectedIndicator === data.href}
            //   setSelectedIndicator={setSelectedIndicator}
            // />
            <motion.div
              className="relative flex items-center text-white font-light cursor-pointer"
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
                className="absolute left-[-30px] h-2.5 w-2.5 rounded-full bg-white"
              ></motion.div>
              {data.title}
            </motion.div>
          ))}
        </div>
        <Footer />
      </div>
      <Curve />
    </motion.div>
  );
}
