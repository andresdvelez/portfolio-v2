"use client";

import { RoundedButton } from "@/common/RoundedButton";
import { Magnetic } from "@/common/Magnetic";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function WorkPage() {
  return (
    <main className="relative z-20 content-container pt-24 pb-40 md:pb-52 bg-background">
      <Breadcrumbs />
      <header className="flex items-center justify-center mb-12">
        <h1 className="text-5xl md:text-7xl font-medium text-center max-w-[18ch]">
          Creating next level
          <br />
          digital products
        </h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-16" aria-label="Portfolio projects by Andrés Vélez">
        {projects.map((p) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            style={{ display: "block" }}
          >
            <div className="group">
            <article>
              <div className="bg-white/5 p-8">
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.src}
                    alt={`${p.title} project by Andrés Vélez - ${p.description}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-5">
                <h2 className="text-2xl md:text-3xl font-light">{p.title}</h2>
                <Link
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:underline"
                  aria-label={`Visit ${p.title} project website`}
                >
                  Visit ↗
                </Link>
              </div>
              <p className="mt-3 text-white/70 text-sm md:text-base">{p.description}</p>
            </article>
            </div>
          </motion.div>
        ))}
      </section>

      <div className="flex justify-center mt-16">
        <Magnetic>
          <RoundedButton onClick={() => {}}>
            <p className="py-1">Load more</p>
          </RoundedButton>
        </Magnetic>
      </div>
    </main>
  );
}
