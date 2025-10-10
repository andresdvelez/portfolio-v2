import type { Metadata } from "next";

const RAW_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const BASE_URL =
  RAW_BASE_URL.startsWith("http://") || RAW_BASE_URL.startsWith("https://")
    ? RAW_BASE_URL
    : `https://${RAW_BASE_URL}`;

export const metadata: Metadata = {
  title: "Andrés Vélez Projects | Full Stack Development Portfolio",
  description:
    "Explore Andrés Vélez's complete project portfolio: Norvik Tech, Ganado Co, Indahouse, EthicVoice and more. Innovative technological solutions in React, Next.js, Blockchain and AI developed by a Full Stack expert in Medellín, Colombia.",
  keywords: [
    "Andrés Vélez Portfolio",
    "Full Stack Developer Projects",
    "Norvik Tech",
    "Ganado Co",
    "Indahouse",
    "EthicVoice",
    "Blooma",
    "React Projects",
    "Next.js Projects",
    "Blockchain Projects Colombia",
    "Web Development Medellín",
  ],
  openGraph: {
    title: "Andrés Vélez Projects | Full Stack Portfolio",
    description:
      "Complete portfolio with featured projects: Norvik Tech, Ganado Co, Indahouse, EthicVoice. Solutions in React, Next.js, Blockchain and AI.",
    url: `${BASE_URL}/work`,
    siteName: "Andrés Vélez - Professional Portfolio",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: `${BASE_URL}/work`,
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
