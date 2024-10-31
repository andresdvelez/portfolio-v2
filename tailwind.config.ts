import type { Config } from "tailwindcss";
import { addDynamicIconSelectors } from "@iconify/tailwind";

import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      height: {
        noheader: "calc(100svh - 120px)",
      },
      fontFamily: {
        "saint-regus": "var(--font-saint-regus)",
      },
    },
  },
  plugins: [nextui(), addDynamicIconSelectors()],
};
export default config;
