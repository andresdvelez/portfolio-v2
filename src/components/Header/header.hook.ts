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

    const mediaQuery = window.innerWidth < 768;
    const endScroll = mediaQuery
      ? window.innerHeight - window.innerHeight
      : window.innerHeight - 800;

    console.log(mediaQuery);

    // gsap.set(button.current, { scale: mediaQuery ? 1 : 0 });

    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: mediaQuery ? "top top" : "0",
        end: endScroll,
        immediateRender: false,
        onUpdate: (self) => {
          if (self.direction === 1) {
            // Scrolling down
            gsap.to(button.current, {
              scale: 1,
              duration: 0.25,
              ease: "power1.out",
            });
          } else if (self.direction === -1 && self.progress < 0.1) {
            // Scrolling up and near the top
            gsap.to(button.current, {
              scale: 0,
              duration: 0.25,
              ease: "power1.out",
            });
            setIsActive(false);
          }
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
