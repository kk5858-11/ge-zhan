"use client";

/**
 * 联系区：输入框微动 + 提交时粒子爆发（轻量 DOM 粒子 + GSAP）
 */
import { motion } from "framer-motion";
import { FormEvent, useCallback, useRef, useState } from "react";
import gsap from "gsap";

type Particle = { id: number };

export function ContactSection() {
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

  return (
    <section id="contact" className="relative z-10 px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <div>
          <motion.h2
            className="text-xs uppercase tracking-[0.35em] text-zinc-500"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contact
          </motion.h2>
          <p className="mt-4 max-w-md text-2xl text-zinc-100 md:text-3xl">一起把 AI 做到「可交付」。</p>
          <p className="mt-4 text-sm text-zinc-400">留下需求与联系方式，我会在 24h 内回复。</p>
        </div>

        <motion.form
          onSubmit={onSubmit}
          className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_60px_-28px_rgba(99,102,241,0.85)] backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <label className="block text-xs uppercase tracking-widest text-zinc-500">Name</label>
          <motion.input
            whileFocus={{ y: -2 }}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-zinc-100 outline-none ring-0 transition focus:border-indigo-400/60"
            placeholder="怎么称呼你"
          />
          <label className="mt-6 block text-xs uppercase tracking-widest text-zinc-500">Message</label>
          <motion.textarea
            whileFocus={{ y: -2 }}
            rows={4}
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-400/60"
            placeholder="想解决什么问题？"
          />
          <div className="relative mt-8">
            <button
              type="submit"
              className="relative z-10 w-full rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(99,102,241,0.9)] transition hover:bg-indigo-400"
            >
              发送（演示粒子）
            </button>
            {/* 粒子：相对按钮容器中心爆发 */}
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

      <div className="mx-auto mt-16 flex max-w-5xl justify-center gap-8 text-zinc-400">
        {["GitHub", "X", "Mail"].map((label) => (
          <motion.a
            key={label}
            href="#"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs"
            whileHover={{ rotate: 12, y: -4, borderColor: "rgba(165,180,252,0.8)" }}
          >
            {label[0]}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
