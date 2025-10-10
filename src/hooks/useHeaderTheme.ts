import { useEffect, useState } from "react";

export const useHeaderTheme = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkBackground = () => {
      // Get the element behind the header at the center position
      const headerElement = document.querySelector(".dynamic-header-theme");
      if (!headerElement) {
        // Retry after a short delay if element not found yet
        setTimeout(checkBackground, 50);
        return;
      }

      const rect = headerElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Temporarily hide header to get element behind it
      const originalPointerEvents = (headerElement as HTMLElement).style
        .pointerEvents;
      (headerElement as HTMLElement).style.pointerEvents = "none";

      const elementBehind = document.elementFromPoint(centerX, centerY);
      (headerElement as HTMLElement).style.pointerEvents =
        originalPointerEvents;

      if (elementBehind) {
        // Function to find the first element with a solid background color
        const findSolidBackground = (
          element: Element | null
        ): string | null => {
          let currentElement = element;
          let depth = 0;
          const maxDepth = 20; // Prevent infinite loops

          while (currentElement && depth < maxDepth) {
            const computedStyle = window.getComputedStyle(currentElement);
            const bgColor = computedStyle.backgroundColor;

            // Parse RGBA
            const match = bgColor.match(
              /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
            );

            if (match) {
              const r = parseInt(match[1]);
              const g = parseInt(match[2]);
              const b = parseInt(match[3]);
              const a = match[4] ? parseFloat(match[4]) : 1;

              // If alpha is not 0 (not fully transparent), use this color
              if (a > 0.1) {
                return bgColor;
              }
            }

            // Move to parent element
            currentElement = currentElement.parentElement;
            depth++;
          }

          // If no solid color found, default to white
          return "rgb(255, 255, 255)";
        };

        const bgColor = findSolidBackground(elementBehind);

        // Parse RGB color
        if (bgColor) {
          const rgb = bgColor.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0]);
            const g = parseInt(rgb[1]);
            const b = parseInt(rgb[2]);

            // Calculate relative luminance using the formula
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            // If luminance > 0.5, background is light
            setIsDark(luminance <= 0.5);
          }
        }
      }
    };

    // Check on mount with small delay to ensure DOM is ready
    const timeoutId = setTimeout(checkBackground, 100);

    // Check on scroll
    window.addEventListener("scroll", checkBackground);
    // Check on resize
    window.addEventListener("resize", checkBackground);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", checkBackground);
      window.removeEventListener("resize", checkBackground);
    };
  }, []);

  return isDark;
};
