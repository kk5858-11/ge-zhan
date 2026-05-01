"use client";

/**
 * 首屏 Hero：锚点 #home（与导航「首页」对应）
 */
import { motion } from "framer-motion";
import { useSiteUi } from "@/components/providers/SiteUiProvider";

export function HeroSection() {
  const { t, theme } = useSiteUi();

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-[100dvh] scroll-mt-[72px] flex-col items-center justify-end px-6 pb-24 pt-32 text-center md:scroll-mt-[76px] md:pb-32"
    >
      <motion.h1
        className={`pointer-events-none max-w-4xl bg-gradient-to-b bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-6xl ${
          theme === "light"
            ? "from-zinc-900 via-indigo-800 to-indigo-500"
            : "from-white via-indigo-100 to-indigo-400/90"
        }`}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        Hi, I&apos;m {t.name}
      </motion.h1>
      <motion.p
        className={`pointer-events-none mt-5 max-w-xl text-sm md:text-base ${
          theme === "light" ? "text-zinc-600" : "text-zinc-400"
        }`}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        {t.heroSubtitle}
      </motion.p>
      <motion.a
        href="#contact"
        className="pointer-events-auto mt-10 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-8 py-3 text-sm font-medium text-indigo-200 shadow-[0_0_40px_-10px_rgba(99,102,241,0.9)] backdrop-blur-md transition hover:border-indigo-400 hover:bg-indigo-500/20 hover:shadow-[0_0_55px_-8px_rgba(129,140,248,1)] md:text-base"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {t.heroCta}
      </motion.a>
    </section>
  );
}
