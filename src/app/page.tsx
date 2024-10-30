"use client";

import { Hero } from "@/components/Hero";
import { PreloaderComponent } from "@/components/PreloaderInjection";
import { Projects } from "@/components/Projects";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
      <PreloaderComponent />
      <Hero />
      <Projects />
    </main>
  );
}
