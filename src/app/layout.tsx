import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import RouteTransition from "@/components/RouteTransition";
import { SmoothScrollProvider } from "@/context/ref-scroll";

const inter = Inter({ subsets: ["latin"] });

const saintRegus = localFont({
  src: [
    {
      path: "./fonts/SaintRegus-SemiBold.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-saint-regus",
});

const RAW_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
// Ensure the BASE_URL always has a protocol to satisfy new URL()
const BASE_URL =
  RAW_BASE_URL.startsWith("http://") || RAW_BASE_URL.startsWith("https://")
    ? RAW_BASE_URL
    : `https://${RAW_BASE_URL}`;
const OPEN_GRAPH_IMAGE_URL = `${BASE_URL}/thumbnail.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Andrés Vélez | Full Stack Software Developer & Co-Founder",
  description:
    "Andrés Vélez is a Full Stack software developer with over 5 years of experience working with multinational companies and internationally recognized brands. Co-founder of Norvik Tech and Ganado Co, specialized in developing technology companies and projects that generate real impact. Based in Medellín, Colombia.",
  keywords: [
    "Andrés Vélez",
    "Andres Velez",
    "Full Stack Developer",
    "Software Developer Medellín",
    "React Developer Colombia",
    "Next.js Developer",
    "TypeScript Expert",
    "Norvik Tech",
    "Ganado Co",
    "Blockchain Developer",
    "Web Developer Medellín",
    "Software Engineer Colombia",
    "Full Stack Colombia",
    "Andrés Vélez Developer",
  ],
  authors: [{ name: "Andrés Vélez" }],
  creator: "Andrés Vélez",
  publisher: "Andrés Vélez",
  alternates: {
    canonical: "https://www.andresvelez.co",
  },
  openGraph: {
    title: "Andrés Vélez | Full Stack Software Developer & Tech Entrepreneur",
    description:
      "Full Stack Developer with +5 years of experience working with multinational companies and recognized brands. Co-founder of Norvik Tech and Ganado Co. Specialized in developing technology companies and projects from Medellín, Colombia.",
    url: BASE_URL,
    siteName: "Andrés Vélez - Professional Portfolio",
    images: [
      {
        url: OPEN_GRAPH_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Andrés Vélez - Full Stack Software Developer in Medellín, Colombia",
      },
    ],
    locale: "en_US",
    type: "profile",
    firstName: "Andrés",
    lastName: "Vélez",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrés Vélez | Full Stack Developer & Co-Founder",
    description:
      "Full Stack Developer +5 years exp. Co-founder @NorvikTech & @GanadoCo. Specialized in developing technology companies and projects",
    images: [OPEN_GRAPH_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrés Vélez",
    alternateName: "Andres Velez",
    url: BASE_URL,
    image: `${BASE_URL}/me.png`,
    jobTitle: "Full Stack Software Developer",
    description:
      "Full Stack software developer with over 5 years of experience working with multinational companies and recognized brands. Co-founder of Norvik Tech and Ganado Co, specialized in developing technology companies and projects.",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universidad de Antioquia",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    email: "contact@andresvelez.co",
    sameAs: [
      "https://www.linkedin.com/in/andres-velez-su/",
      "https://www.instagram.com/andresvelezs/",
      "https://github.com/andresvelez",
      "https://www.norvik.tech/es",
      "https://ganado.co/",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Blockchain",
      "Inteligencia Artificial",
      "Desarrollo Web",
      "Arquitectura de Software",
      "Full Stack Development",
    ],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Co-Founder and Developer",
        occupationLocation: {
          "@type": "Organization",
          name: "Norvik Tech",
          url: "https://www.norvik.tech/es",
        },
      },
      {
        "@type": "Occupation",
        name: "Co-Founder",
        occupationLocation: {
          "@type": "Organization",
          name: "Ganado Co",
          url: "https://ganado.co/",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className={` ${saintRegus.variable} ${inter.className} antialiased w-screen overflow-x-hidden`}
      >
        <SmoothScrollProvider>
          <RouteTransition />
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
