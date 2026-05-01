"use client";

/**
 * 作品集：锚点 #works，横向滚轮画廊
 */
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, WheelEvent } from "react";
import { useSiteUi } from "@/components/providers/SiteUiProvider";
import { ART_PATHS, publicUrl } from "@/lib/artGallery";

export function PortfolioSection() {
  const scroller = useRef<HTMLDivElement>(null);
  const { t, theme } = useSiteUi();

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (!scroller.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scroller.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  const card =
    theme === "light"
      ? "border-black/10 bg-gradient-to-br from-white via-zinc-50 to-zinc-100 shadow-[0_0_40px_-20px_rgba(99,102,241,0.35)]"
      : "border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black shadow-[0_0_60px_-30px_rgba(79,70,229,0.9)]";

  return (
    <section id="works" className="relative z-10 scroll-mt-[72px] px-6 py-28 md:scroll-mt-[76px] md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-center text-xs uppercase tracking-[0.35em] text-zinc-500"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          {t.worksTitle}
        </motion.h2>
        <p
          className={`mx-auto mt-4 max-w-xl text-center text-sm ${theme === "light" ? "text-zinc-600" : "text-zinc-400"}`}
        >
          {t.worksHint}
        </p>

        <div
          ref={scroller}
          onWheel={onWheel}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {t.projects.map((p, i) => (
            <motion.article
              key={p.id}
              className={`group relative min-w-[78vw] snap-center rounded-3xl border p-8 md:min-w-[340px] ${card}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.35),_transparent_55%)] opacity-0 transition group-hover:opacity-100" />
              <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden rounded-2xl">
                <Image
                  src={publicUrl(ART_PATHS[p.image])}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 78vw, 340px"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <p className="text-xs text-indigo-300/80">Case {String(i + 1).padStart(2, "0")}</p>
              <h3 className={`mt-4 text-2xl font-semibold ${theme === "light" ? "text-zinc-900" : "text-zinc-50"}`}>
                {p.name}
              </h3>
              <p className={`mt-3 text-sm ${theme === "light" ? "text-zinc-600" : "text-zinc-400"}`}>{p.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
