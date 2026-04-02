"use client";

import { useSmoothScrollContext } from "@/context/ref-scroll";
import { Link } from "@nextui-org/react";
import { useInView } from "framer-motion";
import Image from "next/image";
import React from "react";

const focusAreas = [
  "Applied AI & deep learning",
  "Blockchain & Web3 product patterns",
  "Computer vision & data pipelines",
  "Open source (GitHub)",
];

export const About = () => {
  const { workRef } = useSmoothScrollContext();

  const inView = useInView(workRef, { margin: "-10% 0px", amount: 0.15 });

  return (
    <section
      ref={workRef}
      className="border-t border-white/[0.06] bg-background"
      aria-labelledby="about-heading"
    >
      <div className="content-container mx-auto max-w-[1280px] py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14 items-start">
          {/* Aside: label stays visible on scroll (desktop) */}
          <header className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 lg:self-start space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">
              Editorial
            </p>
            <h2
              id="about-heading"
              className="text-2xl font-medium tracking-tight text-white sm:text-3xl"
            >
              Notes &amp; practice
            </h2>
            <p className="hidden text-sm leading-relaxed text-white/35 lg:block max-w-[14rem]">
              Long-form context for how I build and what Norvik ships.
            </p>
          </header>

          {/* Body: wide measure, no squeezed 90% + huge padding-right */}
          <div className="min-w-0 space-y-8 md:space-y-10 lg:col-span-8 xl:col-span-9">
            <p className="max-w-[62rem] text-xl font-normal leading-[1.28] text-white/90 sm:text-2xl sm:leading-[1.3] md:text-[1.75rem] md:leading-[1.32] lg:text-[2rem] lg:leading-[1.28] xl:text-[2.125rem]">
              I&apos;m{" "}
              <span className="text-white">Andrés Vélez</span>—founder of{" "}
              <Link
                href="https://www.norvik.tech/es"
                target="_blank"
                className="relative inline text-inherit text-white no-underline hover:opacity-90"
              >
                {inView && (
                  <Image
                    src="https://cdn.prod.website-files.com/665ea416583f76e1fde5faa5/6668891d705a2a0193a968a9_swash.svg"
                    alt=""
                    fill
                    className="pointer-events-none absolute !inset-y-4 sm:!inset-y-5"
                    aria-hidden
                  />
                )}
                Norvik Tech
              </Link>
              , the studio where I lead architecture, delivery, and the narrative
              of every release. This site reads like a personal engineering blog:
              short essays in the margins, long-form rigor in the codebase, and a
              portfolio that mirrors what we ship for founders and enterprise
              teams across LATAM and Europe.
            </p>

            <p className="max-w-[48rem] text-base font-light leading-[1.65] text-white/55 sm:text-lg sm:leading-[1.7] md:text-xl md:leading-[1.65]">
              My bias is toward innovation you can operate: models in production
              (deep learning and computer vision in products like{" "}
              <Link
                href="https://palmapp.co/"
                target="_blank"
                className="text-white/85 underline-offset-[0.2em] transition-colors hover:text-white hover:underline"
              >
                Palmapp
              </Link>
              ), automation that respects compliance (RegTech, ethics, and
              marketplace trust), and Web3-style transparency where tokenization
              and shared ledgers genuinely reduce friction—not hype. Off-hours,
              I stay close to the open source community on{" "}
              <Link
                href="https://github.com/andresvelez"
                target="_blank"
                className="text-white/85 underline-offset-[0.2em] transition-colors hover:text-white hover:underline"
              >
                GitHub
              </Link>
              , contributing patterns and tooling that feed back into client
              work.
            </p>

            <ul
              className="flex max-w-[48rem] flex-wrap gap-2 md:gap-3"
              aria-label="Primary technical focus"
            >
              {focusAreas.map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1.5 text-xs tracking-wide text-white/70 md:px-4 md:py-2 md:text-sm"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
