import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { PreloaderComponent } from "@/components/PreloaderInjection";
import { Projects } from "@/components/Projects";
import type { Metadata } from "next";

const RAW_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const BASE_URL =
  RAW_BASE_URL.startsWith("http://") || RAW_BASE_URL.startsWith("https://")
    ? RAW_BASE_URL
    : `https://${RAW_BASE_URL}`;

// Metadata específica para la página principal
export const metadata: Metadata = {
  title:
    "Andrés Vélez | Founder of Norvik Tech — AI, Web3 & engineering notebook",
  description:
    "Personal engineering site of Andrés Vélez, founder of Norvik Tech: applied AI, deep learning, Web3, and full-stack delivery—with a portfolio aligned to the studio’s shipped work and open source on GitHub.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    url: BASE_URL,
  },
};

export default function Home() {
  return (
    <>
      <PreloaderComponent />
      <Hero />
      <About />
      <Projects />
    </>
  );
}
