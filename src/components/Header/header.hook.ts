import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const LG_PX = 1024;

export const useHeader = () => {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /** Menu button only on viewports < lg; no scroll-based reveal on desktop. */
  useLayoutEffect(() => {
    if (!button.current) return;

    const syncMenuButton = () => {
      const compact = window.innerWidth < LG_PX;
      gsap.set(button.current, {
        scale: compact ? 1 : 0,
        pointerEvents: compact ? "auto" : "none",
      });
      if (!compact) {
        setIsActive(false);
      }
    };

    syncMenuButton();
    window.addEventListener("resize", syncMenuButton);
    return () => window.removeEventListener("resize", syncMenuButton);
  }, []);

  return {
    header,
    button,
    setIsActive,
    isActive,
  };
};
