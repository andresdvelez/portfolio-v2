import type { Metadata } from "next";

const RAW_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const BASE_URL =
  RAW_BASE_URL.startsWith("http://") || RAW_BASE_URL.startsWith("https://")
    ? RAW_BASE_URL
    : `https://${RAW_BASE_URL}`;

export const metadata: Metadata = {
  title: "Projects & case studies | Andrés Vélez",
  description:
    "Portfolio of shipped products: applied AI, computer vision, marketplaces, RegTech, MarTech, e-commerce, and education platforms—each linking to the live product.",
  keywords: [
    "Andrés Vélez projects",
    "Full stack portfolio",
    "Applied AI",
    "Web3 PropTech",
    "Deep learning AgriTech",
    "RegTech",
    "SEMsei",
    "Palmapp",
    "Ganado.co",
    "Indahouse",
    "EthicVoice",
    "Matchies",
    "Newayzi",
  ],
  openGraph: {
    title: "Projects & case studies | Andrés Vélez",
    description:
      "Selected builds across AI, platforms, and regulated industries—live links to every product.",
    url: `${BASE_URL}/work`,
    siteName: "Andrés Vélez",
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
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Andrés Vélez — projects & case studies",
    description:
      "Portfolio of software products and platforms led by Andrés Vélez.",
    url: `${BASE_URL}/work`,
    mainEntity: {
      "@type": "Person",
      name: "Andrés Vélez",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      {children}
    </>
  );
}
