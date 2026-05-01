"use client";

/**
 * 联系：锚点 #contact，表单 + 粒子演示 + 社交入口
 */
import { motion } from "framer-motion";
import { FormEvent, useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { useSiteUi } from "@/components/providers/SiteUiProvider";

type Particle = { id: number };

export function ContactSection() {
  const { t, theme } = useSiteUi();
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

  const burst = useCallback(() => {
    const batch: Particle[] = Array.from({ length: 18 }).map(() => ({
      id: idRef.current++,
    }));
    setParticles((p) => [...p, ...batch]);
    requestAnimationFrame(() => {
      batch.forEach((pt, idx) => {
        const el = document.getElementById(`pt-${pt.id}`);
        if (!el) return;
        const angle = (idx / batch.length) * Math.PI * 2 + Math.random();
        const dist = 40 + Math.random() * 70;
        gsap.fromTo(
          el,
          { x: 0, y: 0, opacity: 1, scale: 1 },
          {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            opacity: 0,
            scale: 0.2,
            duration: 0.75,
            ease: "power3.out",
            onComplete: () => {
              setParticles((prev) => prev.filter((x) => x.id !== pt.id));
            },
          }
        );
      });
    });
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    burst();
  };

  const formSurface =
    theme === "light"
      ? "border-black/10 bg-white/80 shadow-[0_0_40px_-20px_rgba(99,102,241,0.25)]"
      : "border-white/10 bg-white/[0.03] shadow-[0_0_60px_-28px_rgba(99,102,241,0.85)]";

  const input =
    theme === "light"
      ? "border-black/10 bg-white text-zinc-900 placeholder:text-zinc-400"
      : "border-white/10 bg-black/40 text-zinc-100 placeholder:text-zinc-500";

  return (
    <section id="contact" className="relative z-10 scroll-mt-[72px] px-6 py-28 md:scroll-mt-[76px] md:py-36">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <div>
          <motion.h2
            className="text-xs uppercase tracking-[0.35em] text-zinc-500"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.contactKicker}
          </motion.h2>
          <p className={`mt-4 max-w-md text-2xl md:text-3xl ${theme === "light" ? "text-zinc-900" : "text-zinc-100"}`}>
            {t.contactLead}
          </p>
          <p className={`mt-4 text-sm ${theme === "light" ? "text-zinc-600" : "text-zinc-400"}`}>{t.contactFormHint}</p>
        </div>

        <motion.form
          onSubmit={onSubmit}
          className={`relative rounded-3xl border p-8 backdrop-blur-xl ${formSurface}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <label className="block text-xs uppercase tracking-widest text-zinc-500">Name</label>
          <motion.input
            whileFocus={{ y: -2 }}
            className={`mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-indigo-400/60 ${input}`}
            placeholder={t.namePh}
          />
          <label className="mt-6 block text-xs uppercase tracking-widest text-zinc-500">Message</label>
          <motion.textarea
            whileFocus={{ y: -2 }}
            rows={4}
            className={`mt-2 w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-indigo-400/60 ${input}`}
            placeholder={t.msgPh}
          />
          <div className="relative mt-8">
            <button
              type="submit"
              className="relative z-10 w-full rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(99,102,241,0.9)] transition hover:bg-indigo-400"
            >
              {t.contactSubmit}
            </button>
            {particles.map((pt) => (
              <span
                key={pt.id}
                id={`pt-${pt.id}`}
                className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-200"
              />
            ))}
          </div>
        </motion.form>
      </div>

      <div className="mx-auto mt-12 max-w-md text-center">
        <p className={`text-xs ${theme === "light" ? "text-zinc-500" : "text-zinc-500"}`}>WeChat · 替换为你的二维码图片</p>
        <div
          className={`mx-auto mt-3 flex h-28 w-28 items-center justify-center rounded-xl border border-dashed text-[10px] ${
            theme === "light" ? "border-black/15 text-zinc-500" : "border-white/20 text-zinc-500"
          }`}
        >
          QR
        </div>
      </div>

      <div className={`mx-auto mt-16 flex max-w-5xl justify-center gap-8 ${theme === "light" ? "text-zinc-600" : "text-zinc-400"}`}>
        <motion.a
          href="https://github.com/kk5858-11"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-12 w-12 items-center justify-center rounded-full border text-xs ${
            theme === "light" ? "border-black/10 bg-white/80" : "border-white/10 bg-white/5"
          }`}
          whileHover={{ rotate: 12, y: -4, borderColor: "rgba(165,180,252,0.8)" }}
        >
          G
        </motion.a>
        <motion.a
          href="https://www.xiaohongshu.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-12 w-12 items-center justify-center rounded-full border text-xs ${
            theme === "light" ? "border-black/10 bg-white/80" : "border-white/10 bg-white/5"
          }`}
          whileHover={{ rotate: 12, y: -4, borderColor: "rgba(165,180,252,0.8)" }}
        >
          红
        </motion.a>
        <motion.a
          href="mailto:hello@example.com"
          className={`flex h-12 w-12 items-center justify-center rounded-full border text-xs ${
            theme === "light" ? "border-black/10 bg-white/80" : "border-white/10 bg-white/5"
          }`}
          whileHover={{ rotate: 12, y: -4, borderColor: "rgba(165,180,252,0.8)" }}
        >
          @
        </motion.a>
      </div>
    </section>
  );
}
