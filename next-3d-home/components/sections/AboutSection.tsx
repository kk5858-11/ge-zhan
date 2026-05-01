"use client";

/**
 * 关于我：3D 翻转卡片（CSS transform-style）+ 技能标签悬浮
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { SITE } from "@/lib/site";

export function AboutSection() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section id="about" className="relative z-10 px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="text-center text-xs uppercase tracking-[0.35em] text-zinc-500"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          About
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-center text-2xl text-zinc-100 md:text-3xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          {SITE.title}
        </motion.p>

        <div className="mx-auto mt-14 max-w-xl [perspective:1200px]">
          <button
            type="button"
            onClick={() => setFlipped((v) => !v)}
            className="group relative h-64 w-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-[1px] text-left shadow-[0_0_60px_-25px_rgba(99,102,241,0.9)] outline-none transition hover:border-indigo-400/40 md:h-72"
            aria-pressed={flipped}
          >
            <div
              className="relative h-full w-full rounded-[1.4rem] bg-[#0a0a0d]/80 p-8 transition-transform duration-700 [transform-style:preserve-3d]"
              style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              {/* 正面 */}
              <div className="absolute inset-0 flex flex-col justify-between rounded-[1.4rem] backface-hidden">
                <p className="text-sm text-zinc-400">点击卡片翻转</p>
                <p className="text-lg leading-relaxed text-zinc-200 md:text-xl">{SITE.aboutBody}</p>
              </div>
              {/* 背面 */}
              <div
                className="absolute inset-0 flex flex-col justify-center rounded-[1.4rem] px-8 backface-hidden"
                style={{ transform: "rotateY(180deg)" }}
              >
                <p className="text-sm text-indigo-200/90">Focus</p>
                <p className="mt-3 text-base text-zinc-300">
                  评测驱动迭代 · 数据决定上限 · Prompt 决定下限
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
          {SITE.skills.map((s, i) => (
            <motion.span
              key={s}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-200 shadow-sm backdrop-blur-md md:text-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, borderColor: "rgba(129,140,248,0.7)" }}
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
