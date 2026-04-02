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
  title:
    "Andrés Vélez | Founder of Norvik Tech — AI, Web3 & Full Stack Engineering",
  description:
    "Andrés Vélez is the founder of Norvik Tech, a product studio shipping platforms across applied AI, deep learning, Web3, and regulated industries. Personal engineering blog and portfolio with case studies from Palmapp, Semsei, Ganado.co, Indahouse, and more. Open source contributor. Medellín, Colombia.",
  keywords: [
    "Andrés Vélez",
    "Andres Velez",
    "Norvik Tech founder",
    "Applied AI",
    "Deep learning products",
    "Web3 developer",
    "Blockchain product",
    "Full Stack Developer Medellín",
    "React",
    "Next.js",
    "TypeScript",
    "Open source GitHub",
    "Computer vision",
    "RegTech",
    "PropTech",
    "AgriTech",
    "Software studio Colombia",
  ],
  authors: [{ name: "Andrés Vélez" }],
  creator: "Andrés Vélez",
  publisher: "Andrés Vélez",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Andrés Vélez | Norvik Tech founder — AI, Web3 & product engineering",
    description:
      "Founder-led studio portfolio: applied AI, deep learning in production, Web3-ready marketplaces, and full-stack platforms. Engineering notes, shipped work, and open source from Medellín.",
    url: BASE_URL,
    siteName: "Andrés Vélez - Professional Portfolio",
    images: [
      {
        url: OPEN_GRAPH_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Andrés Vélez — founder of Norvik Tech, engineer in Medellín",
      },
    ],
    locale: "en_US",
    type: "profile",
    firstName: "Andrés",
    lastName: "Vélez",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrés Vélez | Founder of Norvik Tech — AI & Web3 engineering",
    description:
      "Founder @NorvikTech. Shipping applied AI, deep learning, Web3, and full-stack products. Portfolio + open source.",
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
    jobTitle: "Founder & Principal Engineer",
    description:
      "Founder of Norvik Tech. Builds and leads product engineering across applied AI, deep learning, Web3, and enterprise platforms; open source collaborator.",
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
      "Artificial Intelligence",
      "Deep Learning",
      "Computer Vision",
      "Web3",
      "Blockchain",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Open Source Software",
      "Product Engineering",
      "Software Architecture",
    ],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Founder & Principal Engineer",
        occupationLocation: {
          "@type": "Organization",
          name: "Norvik Tech",
          url: "https://www.norvik.tech/es",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Andrés Vélez — engineering blog & Norvik portfolio",
    url: BASE_URL,
    description:
      "Personal site of Andrés Vélez, founder of Norvik Tech: portfolio of shipped products, focus on AI, Web3, and open source. Medellín, Colombia.",
    author: {
      "@type": "Person",
      name: "Andrés Vélez",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/work?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="max-w-full overflow-x-clip">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={` ${saintRegus.variable} ${inter.className} antialiased min-h-screen w-full max-w-full overflow-x-clip`}
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
