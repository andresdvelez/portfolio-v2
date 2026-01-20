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
  title: "Andrés Vélez | Full Stack Software Developer & Co-Founder",
  description:
    "Andrés Vélez is a Full Stack software developer with over 5 years of experience working with multinational companies and internationally recognized brands. Co-founder of Norvik Tech and Ganado Co, specialized in developing technology companies and projects that generate real impact. Based in Medellín, Colombia.",
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
