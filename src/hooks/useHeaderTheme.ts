import { useEffect, useState } from "react";

export const useHeaderTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      const headerElement = document.querySelector(".dynamic-header-theme");
      if (!headerElement) {
        setTimeout(checkBackground, 50);
        return;
      }

      const rect = headerElement.getBoundingClientRect();
      const headerBottom = rect.bottom;
      const headerCenter = rect.left + rect.width / 2;

      // Check multiple points in the viewport to find the actual content section
      const checkPoints = [
        { x: headerCenter, y: headerBottom + 100 }, // 100px below header
        { x: headerCenter, y: headerBottom + 300 }, // 300px below header
        { x: headerCenter, y: window.innerHeight / 2 }, // Middle of viewport
        { x: headerCenter, y: window.innerHeight - 100 }, // Near bottom of viewport
      ];

      // Temporarily disable pointer events on the header
      const originalPointerEvents = (headerElement as HTMLElement).style
        .pointerEvents;
      (headerElement as HTMLElement).style.pointerEvents = "none";

      let detectedColor: string | null = null;

      // Try each checkpoint until we find a content section
      for (const point of checkPoints) {
        const elementAtPoint = document.elementFromPoint(point.x, point.y);
        if (!elementAtPoint) continue;

        // Function to find the first non-transparent background color
        // Skip elements with negative z-index or canvas elements
        const findSolidBackground = (
          element: Element | null
        ): string | null => {
          let currentElement = element;
          let depth = 0;
          const maxDepth = 20;

          while (currentElement && depth < maxDepth) {
            // Skip canvas elements (usually background animations)
            if (currentElement.tagName === "CANVAS") {
              currentElement = currentElement.parentElement;
              depth++;
              continue;
            }

            const computedStyle = window.getComputedStyle(currentElement);
            const zIndex = computedStyle.zIndex;

            // Skip elements with negative z-index (background layers)
            if (zIndex && parseInt(zIndex) < 0) {
              currentElement = currentElement.parentElement;
              depth++;
              continue;
            }

            const bgColor = computedStyle.backgroundColor;
            const match = bgColor.match(
              /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
            );

            if (match) {
              const a = match[4] ? parseFloat(match[4]) : 1;

              // If the alpha is greater than 0.05, consider it a solid color
              if (a > 0.05) {
                return bgColor;
              }
            }

            currentElement = currentElement.parentElement;
            depth++;
          }

          return null;
        };

        const color = findSolidBackground(elementAtPoint);
        if (color) {
          detectedColor = color;
          break; // Found a solid color, use it
        }
      }

      (headerElement as HTMLElement).style.pointerEvents =
        originalPointerEvents;

      // Default to white if no color found
      const finalColor = detectedColor || "rgb(255, 255, 255)";

      // Parse RGB values
      const rgb = finalColor.match(/\d+/g);

      if (rgb && rgb.length >= 3) {
        const r = parseInt(rgb[0]);
        const g = parseInt(rgb[1]);
        const b = parseInt(rgb[2]);

        // Calculate relative luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // If luminance > 0.6, background is light
        setIsDark(luminance < 0.6);
      }
    };

    // Check on mount with small delay to ensure DOM is ready
    const timeoutId = setTimeout(checkBackground, 100);

    // Check on scroll with debounce
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkBackground, 50);
    };

    // Check on scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check on resize
    window.addEventListener("resize", checkBackground);

    // Also check periodically to catch any missed changes
    const intervalId = setInterval(checkBackground, 500);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(scrollTimeout);
      clearInterval(intervalId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkBackground);
    };
  }, []);

  return isDark;
};
