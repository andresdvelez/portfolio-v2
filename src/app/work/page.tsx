"use client";

import { RoundedButton } from "@/common/RoundedButton";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons/Arrows";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WorkPage() {
  return (
    <main className="relative z-20 min-h-screen overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent"
        aria-hidden
      />

      <div className="content-container relative mx-auto max-w-[1100px] px-4 pb-28 pt-20 sm:px-6 sm:pt-24 md:pb-36 md:pt-28 lg:px-8">
        <Breadcrumbs />

        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="show"
          className="mb-12 space-y-4 sm:mb-14 md:mb-16 md:space-y-5"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
            Selected work
          </p>
          <h1 className="max-w-[18ch] text-3xl font-medium leading-[1.08] tracking-tight text-white sm:text-4xl md:max-w-none md:text-5xl lg:text-6xl">
            Projects &amp; case studies
          </h1>
          <p className="max-w-2xl text-sm font-light leading-relaxed text-white/50 sm:text-base md:text-lg">
            A chronological gallery of products I have led end-to-end—from
            applied AI and computer vision to marketplaces, RegTech, and
            high-trust platforms. Each card opens the live site in a new tab.
          </p>
        </motion.header>

        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-8 lg:gap-10"
          aria-label="Portfolio projects by Andrés Vélez"
        >
          {projects.map((p) => (
            <motion.article key={p.slug} variants={item} className="group">
              <Link
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30 sm:rounded-3xl sm:p-4"
                aria-label={`${p.title}: open live product`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-white/10 transition duration-500 group-hover:ring-white/20 sm:rounded-2xl">
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 space-y-1">
                    <h2 className="text-xl font-medium text-white/95 transition-colors group-hover:text-white sm:text-2xl">
                      {p.title}
                    </h2>
                    {(p.industry || p.year) && (
                      <p className="text-xs font-light tracking-wide text-white/40 sm:text-sm">
                        {[p.industry, p.year].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-white/45 transition-colors group-hover:text-white/90">
                    Visit
                    <ArrowUpRightIcon className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]" />
                  </span>
                </div>
                <p className="mt-3 border-t border-white/[0.06] pt-3 text-sm font-light leading-relaxed text-white/55 sm:mt-4 sm:pt-4 sm:text-[0.9375rem]">
                  {p.description}
                </p>
              </Link>
            </motion.article>
          ))}
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col items-center justify-center gap-5 border-t border-white/[0.08] pt-14 sm:mt-20 sm:flex-row sm:gap-8 sm:pt-16"
        >
          <Link href="/" className="inline-flex">
            <RoundedButton>
              <p className="py-1 text-sm sm:text-base">Back to home</p>
            </RoundedButton>
          </Link>
          <Link
            href="https://github.com/andresvelez"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-white/45 underline-offset-4 transition-colors hover:text-white/90 hover:underline"
          >
            Open source on GitHub
            <ArrowRightIcon className="h-4 w-4 shrink-0" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
