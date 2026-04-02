export type PortfolioProject = {
  title: string;
  description: string;
  src: string;
  color: string;
  href: string;
  slug: string;
  industry?: string;
  year?: string;
};

/** Full catalog of shipped products (client work & platforms). */
export const projects: PortfolioProject[] = [
  {
    title: "Palmapp",
    slug: "palmapp",
    description:
      "Mobile field product for palm growers: computer vision, deep learning, and data pipelines to identify crops, fruit, and disease—supporting integrated pest management in low-connectivity environments.",
    src: "/portfolio/palmapp/palmapp-hero.png",
    color: "#166534",
    href: "https://palmapp.co/",
    industry: "AgriTech · CV / ML",
    year: "2026",
  },
  {
    title: "Semsei",
    slug: "semsei",
    description:
      "MarTech platform that scales SEO and LLMO-ready pages with generative workflows—shipping hundreds of indexable routes without betting the funnel only on paid media.",
    src: "/portfolio/semsei/semsei-hero.png",
    color: "#6d28d9",
    href: "https://semsei.io/",
    industry: "MarTech · Gen AI",
    year: "2026",
  },
  {
    title: "Ganado.co",
    slug: "ganado",
    description:
      "Livestock operations platform: traceability, mobile workflows for the field, data-heavy dashboards, and marketplace rails—modernizing a traditional supply chain end to end.",
    src: "/portfolio/ganado/ganado-hero.png",
    color: "#0F2D21",
    href: "https://ganado.co/",
    industry: "AgriTech · Platform",
    year: "2023",
  },
  {
    title: "Indahouse",
    slug: "indahouse",
    description:
      "PropTech investment rails: collective real estate participation with transparent investor dashboards, compliance-aware flows, and payment integrations—bridging capital markets and inventory.",
    src: "/portfolio/indahouse/indahouse-hero.png",
    color: "#C4A574",
    href: "https://indahouse.com.co/",
    industry: "PropTech · FinTech",
    year: "2024",
  },
  {
    title: "EthicVoice",
    slug: "ethicvoice",
    description:
      "Whistleblowing and ethics operations SaaS: anonymous reporting, admin intelligence, and security-first UX for enterprises that need trust at scale.",
    src: "/portfolio/ethicvoice/ethicvoice-hero.png",
    color: "#1B5E20",
    href: "https://www.ethicvoice.co/",
    industry: "SaaS · Compliance",
    year: "2024",
  },
  {
    title: "Verdata",
    slug: "verdata",
    description:
      "RegTech verification product for LATAM: identity and background intelligence with clear plan architecture for HR, legal, and fintech buyers.",
    src: "/portfolio/verdata/verdata-hero.png",
    color: "#1e3a8a",
    href: "https://verdata.co/",
    industry: "RegTech",
    year: "2024",
  },
  {
    title: "Newayzi",
    slug: "newayzi",
    description:
      "Hospitality marketplace for flexible stays across Colombian cities: search, trust signals, rewards, and human support baked into a conversion-focused web experience.",
    src: "/portfolio/newayzi/newayzi-hero.png",
    color: "#ea580c",
    href: "https://newayzi.com/es",
    industry: "Travel · Marketplace",
    year: "2025",
  },
  {
    title: "Matchies",
    slug: "matchies",
    description:
      "DTC confectionery e-commerce for Europe: bundles, subscriptions, ingredient storytelling, and GDPR-aware flows tuned for repeat purchase.",
    src: "/portfolio/matchies/matchies-hero.png",
    color: "#d97706",
    href: "https://www.matchies.fit/",
    industry: "E-commerce · DTC",
    year: "2026",
  },
  {
    title: "La Brutal",
    slug: "labrutal",
    description:
      "Fashion brand launch: bold visual identity, editorial photography, and a commerce stack that carries attitude from hero to checkout.",
    src: "/portfolio/labrutal/labrutal-hero.png",
    color: "#9f1239",
    href: "https://labrutal.co/",
    industry: "Fashion · E-commerce",
    year: "2024",
  },
  {
    title: "CEINFES",
    slug: "ceinfes",
    description:
      "Industrial safety LMS: certifications, payments, and student/professor portals for a training institution scaling digital delivery.",
    src: "/portfolio/ceinfes/ceinfes-hero.png",
    color: "#0f766e",
    href: "https://ceinfes.com/",
    industry: "EdTech · LMS",
    year: "2023",
  },
  {
    title: "Valor Estratégico",
    slug: "valor-estrategico",
    description:
      "Corporate site and content system for a strategy consultancy—editorial clarity, case storytelling, and SEO discipline for senior decision makers.",
    src: "/portfolio/valorestrategico/valor-estrategico-hero.png",
    color: "#475569",
    href: "https://www.valorestrategico.com.co/",
    industry: "Consulting",
    year: "2024",
  },
];

/** Home 3D hover reel — textures must load; keep to four strong technical stories. */
export const popularProjects: PortfolioProject[] = [
  projects[0]!,
  projects[1]!,
  projects[3]!,
  projects[2]!,
];
