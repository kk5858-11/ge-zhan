"use client";

/**
 * 博客 / 笔记区块：卡片列表，锚点 #blog
 */
import { motion } from "framer-motion";
import { useSiteUi } from "@/components/providers/SiteUiProvider";

export function BlogSection() {
  const { t, theme } = useSiteUi();
  const surface = theme === "light" ? "border-black/10 bg-white/80 text-zinc-900" : "border-white/10 bg-white/[0.03] text-zinc-100";

  return (
    <section id="blog" className="relative z-10 scroll-mt-[72px] px-6 py-28 md:scroll-mt-[76px] md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className={`text-center text-xs uppercase tracking-[0.35em] ${theme === "light" ? "text-zinc-500" : "text-zinc-500"}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          {t.blogTitle}
        </motion.h2>
        <motion.p
          className={`mx-auto mt-4 max-w-xl text-center text-sm ${theme === "light" ? "text-zinc-600" : "text-zinc-400"}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.blogLead}
        </motion.p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
              className={`rounded-2xl border p-6 shadow-sm backdrop-blur-md transition hover:-translate-y-1 ${surface}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className={`mt-3 text-sm ${theme === "light" ? "text-zinc-600" : "text-zinc-400"}`}>{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
