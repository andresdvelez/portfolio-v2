"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function RouteTransition() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("Page");

  const computedLabel = useMemo(() => {
    if (pathname === "/") return "Home";
    const name = pathname.replace(/^\/+|\/$/g, "");
    if (!name) return "Home";
    return name
      .split("/")
      .pop()!
      .replace(/-/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());
  }, [pathname]);

  useEffect(() => {
    setLabel(computedLabel);
    if (document?.visibilityState === "visible") {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 700);
      return () => clearTimeout(t);
    }
  }, [computedLabel]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[98] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-white text-4xl md:text-6xl font-medium"
          >
            {label}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
