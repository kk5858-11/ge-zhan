"use client";

/**
 * 作品集：横向 3D 感画廊（滚轮横向滚动 + hover 放大）
 */
import { motion } from "framer-motion";
import { useRef, WheelEvent } from "react";
import { SITE } from "@/lib/site";

export function PortfolioSection() {
  const scroller = useRef<HTMLDivElement>(null);

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (!scroller.current) return;
    // 将纵向滚轮映射为横向滚动，营造「画廊」体验
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scroller.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  return (
    <section id="work" className="relative z-10 px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-center text-xs uppercase tracking-[0.35em] text-zinc-500"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          Selected Work
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-zinc-400">
          使用滚轮左右浏览（触控板纵向滑动即可）
        </p>

        <div
          ref={scroller}
          onWheel={onWheel}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {SITE.projects.map((p, i) => (
            <motion.article
              key={p.id}
              className="group relative min-w-[78vw] snap-center rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black p-8 shadow-[0_0_60px_-30px_rgba(79,70,229,0.9)] md:min-w-[340px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.35),_transparent_55%)] opacity-0 transition group-hover:opacity-100" />
              <p className="text-xs text-indigo-300/80">Case {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-2xl font-semibold text-zinc-50">{p.name}</h3>
              <p className="mt-3 text-sm text-zinc-400">{p.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
