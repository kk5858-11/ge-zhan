"use client";

/**
 * 关于我：锚点 #about，翻转卡片 + 技能标签
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { useSiteUi } from "@/components/providers/SiteUiProvider";

export function AboutSection() {
  const [flipped, setFlipped] = useState(false);
  const { t, theme, locale } = useSiteUi();
  const cardBg = theme === "light" ? "bg-white/90" : "bg-[#0a0a0d]/80";
  const border = theme === "light" ? "border-black/10 hover:border-indigo-400/50" : "border-white/10 hover:border-indigo-400/40";

  return (
    <section id="about" className="relative z-10 scroll-mt-[72px] px-6 py-28 md:scroll-mt-[76px] md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="text-center text-xs uppercase tracking-[0.35em] text-zinc-500"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {t.aboutKicker}
        </motion.h2>
        <motion.p
          className={`mx-auto mt-4 max-w-2xl text-center text-2xl md:text-3xl ${
            theme === "light" ? "text-zinc-900" : "text-zinc-100"
          }`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          {t.title}
        </motion.p>

        <div className="mx-auto mt-14 max-w-xl [perspective:1200px]">
          <button
            type="button"
            onClick={() => setFlipped((v) => !v)}
            className={`group relative h-64 w-full rounded-3xl border bg-gradient-to-br from-white/10 via-white/5 to-transparent p-[1px] text-left shadow-[0_0_60px_-25px_rgba(99,102,241,0.9)] outline-none transition md:h-72 ${border}`}
            aria-pressed={flipped}
          >
            <div
              className={`relative h-full w-full rounded-[1.4rem] p-8 transition-transform duration-700 [transform-style:preserve-3d] ${cardBg}`}
              style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              <div className="absolute inset-0 flex flex-col justify-between rounded-[1.4rem] backface-hidden">
                <p className={`text-sm ${theme === "light" ? "text-zinc-600" : "text-zinc-400"}`}>{t.aboutFlipHint}</p>
                <p className={`text-lg leading-relaxed md:text-xl ${theme === "light" ? "text-zinc-800" : "text-zinc-200"}`}>
                  {t.aboutBody}
                </p>
              </div>
              <div
                className="absolute inset-0 flex flex-col justify-center rounded-[1.4rem] px-8 backface-hidden"
                style={{ transform: "rotateY(180deg)" }}
              >
                <p className="text-sm text-indigo-200/90">Focus</p>
                <p className={`mt-3 text-base ${theme === "light" ? "text-zinc-700" : "text-zinc-300"}`}>
                  {locale === "en"
                    ? "Eval-driven iteration · Data sets the ceiling · Prompt sets the floor"
                    : "评测驱动迭代 · 数据决定上限 · Prompt 决定下限"}
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
          {t.skills.map((s, i) => (
            <motion.span
              key={s}
              className={`rounded-full border px-4 py-2 text-xs shadow-sm backdrop-blur-md md:text-sm ${
                theme === "light"
                  ? "border-black/10 bg-white/80 text-zinc-800"
                  : "border-white/10 bg-white/5 text-zinc-200"
              }`}
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
