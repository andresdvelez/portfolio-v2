"use client";

import { RoundedButton } from "@/common/RoundedButton";
import { Magnetic } from "@/common/Magnetic";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function WorkPage() {
  return (
    <main className="relative z-20 content-container pt-24 pb-40 md:pb-52 bg-background">
      <header className="flex items-center justify-center mb-12">
        <h1 className="text-5xl md:text-7xl font-medium text-center max-w-[18ch]">
          Creating next level
          <br />
          digital products
        </h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {projects.map((p) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="group"
          >
            <div className="bg-white/5 p-8">
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-5">
              <h3 className="text-2xl md:text-3xl font-light">{p.title}</h3>
              <Link
                href={p.href}
                target="_blank"
                className="cursor-pointer hover:underline"
              >
                Visit ↗
              </Link>
            </div>
          </motion.article>
        ))}
      </section>

      <div className="flex justify-center mt-16">
        <Magnetic>
          <RoundedButton>
            <p className="py-1">Load more</p>
          </RoundedButton>
        </Magnetic>
      </div>
    </main>
  );
}
