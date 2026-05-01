"use client";

/**
 * 首屏文案层：渐变标题、副文案、CTA（Framer Motion 入场）
 * pointer-events 精细控制：避免挡住 3D 拖拽，仅按钮可点
 */
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-end px-6 pb-24 pt-32 text-center md:pb-32"
    >
      <motion.h1
        className="pointer-events-none max-w-4xl bg-gradient-to-b from-white via-indigo-100 to-indigo-400/90 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-6xl"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        Hi, I&apos;m {SITE.name}
      </motion.h1>
      <motion.p
        className="pointer-events-none mt-5 max-w-xl text-sm text-zinc-400 md:text-base"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        {SITE.heroSubtitle}
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
        预约一次交流
      </motion.a>
    </section>
  );
}
