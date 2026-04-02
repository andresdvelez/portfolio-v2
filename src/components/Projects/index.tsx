"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RoundedButton } from "../../common/RoundedButton";
import { popularProjects } from "@/data/projects";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons/Arrows";
import Scene from "../Scene";

/** Fine pointer + hover: real mice/trackpads. Skips most phones/tablets to save GPU and avoid broken “hover”. */
const SCENE_MQ = "(min-width: 768px) and (hover: hover) and (pointer: fine)";

export function Projects() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(SCENE_MQ);
    const sync = () => setShowScene(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      className="relative z-10 bg-background mt-20 sm:mt-28 md:mt-32 pb-20 sm:pb-28 md:pb-32 min-h-[min(90svh,920px)]"
      aria-labelledby="projects-heading"
    >
      <div className="content-container max-w-[1100px] mx-auto">
        <div className="relative z-[1] w-full">
          <div className="rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] p-6 sm:p-8 md:p-10 lg:p-12 space-y-8 sm:space-y-10">
            <header className="space-y-3 sm:space-y-4 max-w-2xl">
              <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-white/45">
                Selected work
              </p>
              <div className="flex flex-col gap-2 sm:gap-3">
                <h2
                  id="projects-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white"
                >
                  Portfolio
                </h2>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                  <span className="md:hidden">
                    Four products—tap a row to open the site. See everything on
                    the work page.
                  </span>
                  <span className="hidden md:inline">
                    Four shipped products—hover a row for a light floating
                    preview, or open the live product. The full archive lives on
                    the work page.
                  </span>
                </p>
              </div>
            </header>

            <ul
              className="flex flex-col gap-3 sm:gap-4"
              onMouseLeave={() => setActiveMenu(null)}
            >
              {popularProjects.map((project, i) => (
                <li key={project.slug}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full items-stretch gap-3 sm:gap-5 rounded-xl sm:rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 sm:p-4 md:p-5 text-left transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                    onMouseEnter={() => setActiveMenu(i)}
                    onFocus={() => setActiveMenu(i)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                        setActiveMenu(null);
                      }
                    }}
                    aria-label={`${project.title}: open product site (${project.industry ?? "project"})`}
                  >
                    <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-lg sm:h-[5.25rem] sm:w-[5.25rem] sm:rounded-xl ring-1 ring-white/10 transition-transform duration-300 group-hover:ring-white/20 group-hover:scale-[1.02]">
                      <Image
                        src={project.src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 72px, 84px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 pr-1">
                      <span className="text-base font-medium text-white/90 transition-colors group-hover:text-white sm:text-xl md:text-2xl">
                        {project.title}
                      </span>
                      {(project.industry || project.year) && (
                        <span className="text-xs text-white/40 sm:text-sm">
                          {[project.industry, project.year]
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-end justify-center gap-1 pl-1">
                      <span className="inline-flex text-white/35 transition-colors group-hover:text-white/80">
                        <ArrowUpRightIcon className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5" />
                      </span>
                      <span className="hidden text-[10px] uppercase tracking-wider text-white/35 group-hover:text-white/50 sm:block">
                        Visit
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-stretch gap-4 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-10">
              <Link href="/work" className="inline-flex justify-center sm:justify-start">
                <RoundedButton>
                  <p className="py-1 px-1 text-sm sm:text-base">Full portfolio</p>
                </RoundedButton>
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-1.5 text-center text-sm text-white/45 transition-colors hover:text-white/90 sm:justify-end sm:text-right underline-offset-4 hover:underline"
              >
                Browse all case studies
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showScene ? <Scene activeMenu={activeMenu} /> : null}
    </section>
  );
}
