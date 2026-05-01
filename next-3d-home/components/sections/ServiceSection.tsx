"use client";

/**
 * 服务区块：接单 / 咨询等，锚点 #service
 */
import { motion } from "framer-motion";
import { useSiteUi } from "@/components/providers/SiteUiProvider";

export function ServiceSection() {
  const { t, theme } = useSiteUi();
  const surface = theme === "light" ? "border-black/10 bg-zinc-50/90 text-zinc-900" : "border-white/10 bg-zinc-950/60 text-zinc-100";

  return (
    <section id="service" className="relative z-10 scroll-mt-[72px] px-6 py-28 md:scroll-mt-[76px] md:py-36">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="text-center text-xs uppercase tracking-[0.35em] text-zinc-500"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.serviceTitle}
        </motion.h2>
        <motion.p
          className={`mx-auto mt-4 max-w-2xl text-center text-lg ${theme === "light" ? "text-zinc-700" : "text-zinc-300"}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.serviceLead}
        </motion.p>
        <ul className="mx-auto mt-10 max-w-xl space-y-4">
          {t.serviceItems.map((line, i) => (
            <motion.li
              key={line}
              className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${surface}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] font-bold text-indigo-200">
                ✓
              </span>
              <span className={theme === "light" ? "text-zinc-700" : "text-zinc-300"}>{line}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
