import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const OPEN_GRAPH_IMAGE_URL = `${BASE_URL}/thumbnail.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Andres Velez | Software Developer",
  description: "Andres Velez Software Developer's Portfolio",
  alternates: {
    canonical: "https://andresvelez.dev",
  },
  openGraph: {
    title: "Andres Velez | Software Developer",
    description: "Andres Velez Software Developer's Portfolio",
    url: BASE_URL,
    siteName: "Andres Velez | Software Developer",
    images: [
      {
        url: OPEN_GRAPH_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Andres Velez | Software Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andres Velez | Software Developer",
    description: "Andres Velez Software Developer's Portfolio",
    images: [OPEN_GRAPH_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${saintRegus.variable} ${inter.className} antialiased w-screen overflow-x-hidden`}
      >
        <SmoothScrollProvider>
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
