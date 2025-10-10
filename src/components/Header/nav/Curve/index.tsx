import React from "react";
import { motion } from "framer-motion";

interface Props {
  isDark: boolean;
}

export function Curve({ isDark }: Props) {
  const initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${
    window.innerHeight / 2
  } 100 0`;
  const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${
    window.innerHeight / 2
  } 100 0`;

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <div className="absolute top-0 left-[-99px] w-[100px] h-full overflow-hidden">
      <svg className="w-full h-full transition-colors">
        <motion.path
          className={isDark ? "fill-black/50" : "fill-white/85"}
          variants={curve}
          initial="initial"
          animate="enter"
          exit="exit"
        />
      </svg>
    </div>
  );
}
