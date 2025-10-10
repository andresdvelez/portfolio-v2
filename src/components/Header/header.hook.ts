import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const useHeader = () => {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const endScroll = window.innerHeight - 800;

    // Set initial state based on scroll position
    const shouldShowInitially = window.scrollY > 10;
    gsap.set(button.current, {
      scale: shouldShowInitially ? 1 : 0,
      pointerEvents: shouldShowInitially ? "auto" : "none",
    });

    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: endScroll,
        immediateRender: false,
        onUpdate: (self) => {
          if (self.direction === 1) {
            // Scrolling down
            gsap.to(button.current, {
              scale: 1,
              duration: 0.25,
              ease: "power1.out",
              onStart: () => {
                gsap.set(button.current, { pointerEvents: "auto" });
              },
            });
          } else if (self.direction === -1 && self.progress < 0.1) {
            // Scrolling up and near the top
            gsap.to(button.current, {
              scale: 0,
              duration: 0.25,
              ease: "power1.out",
              onComplete: () => {
                gsap.set(button.current, { pointerEvents: "none" });
              },
            });
            setIsActive(false);
          }
        },
        onRefresh: () => {
          const show = window.scrollY > 10;
          gsap.set(button.current, {
            scale: show ? 1 : 0,
            pointerEvents: show ? "auto" : "none",
          });
        },
      },
    });
  }, []);

  return {
    header,
    button,
    setIsActive,
    isActive,
  };
};
