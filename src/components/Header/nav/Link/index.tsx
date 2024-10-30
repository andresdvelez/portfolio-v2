import Link from "next/link";
import { motion } from "framer-motion";
import { slide, scale } from "../../animation";
import { Dispatch, SetStateAction } from "react";

interface Props {
  data: { title: string; href: string; index: number };
  isActive: boolean;
  setSelectedIndicator: Dispatch<SetStateAction<string>>;
}

export function LinkComponent({ data, isActive, setSelectedIndicator }: Props) {
  const { title, href, index } = data;

  return (
    <motion.div
      className="relative flex items-center"
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className="absolute left-[-30px] h-2.5 w-2.5 rounded-full bg-white"
      ></motion.div>
      <Link href={href}>{title}</Link>
    </motion.div>
  );
}
