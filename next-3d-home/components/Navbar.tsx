"use client";

/**
 * 固定顶栏：锚点跳转、滚动磨砂、当前高亮、移动端汉堡、主题/语言/外链/简历
 */
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { setSceneSection } from "@/lib/sceneNudge";
import { useSiteUi } from "@/components/providers/SiteUiProvider";

const SECTION_IDS = ["home", "about", "works", "blog", "service", "contact"] as const;
/** 移动端抽屉主菜单：5 项（不含 Service，Service 在下方单独入口） */
const MOBILE_IDS = ["home", "about", "works", "blog", "contact"] as const;

export function Navbar() {
  const { theme, toggleTheme, locale, setLocale, t } = useSiteUi();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      setShowTop(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** 区块进入视口时更新当前高亮（IntersectionObserver） */
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = useCallback((id: string) => {
    setSceneSection(id);
    setOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const navItems = useMemo(
    () =>
      SECTION_IDS.map((id) => ({
        id,
        label: t.nav[id],
      })),
    [t]
  );

  const mobileItems = useMemo(
    () => MOBILE_IDS.map((id) => ({ id, label: t.navShort[id] })),
    [t]
  );

  return (
    <>
      <header
        className={`pointer-events-auto fixed left-0 right-0 top-0 z-[90] transition-[background,backdrop-filter,border-color,box-shadow] duration-500 ease-out ${
          scrolled
            ? theme === "light"
              ? "border-b border-black/10 bg-white/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl"
              : "border-b border-white/10 bg-[#0a0a0d]/55 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
        data-theme={theme}
      >
        <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-3 px-4 md:h-[68px] md:px-6">
          {/* 左侧标识 */}
          <button
            type="button"
            onClick={() => go("home")}
            className="group flex items-center gap-2 rounded-full py-1 text-left transition hover:opacity-90"
            aria-label={t.nav.home}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-xs font-semibold tracking-tight text-zinc-100 transition group-hover:border-indigo-400/50 group-hover:text-indigo-200">
              {t.name.slice(0, 2).toUpperCase()}
            </span>
            <span
              className={`hidden text-sm font-medium tracking-tight sm:inline ${theme === "light" ? "text-zinc-800" : "text-zinc-200"}`}
            >
              {t.name}
            </span>
          </button>

          {/* 桌面导航 */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={`group relative px-3 py-2 text-[13px] font-medium transition duration-300 hover:-translate-y-0.5 ${
                  theme === "light"
                    ? "text-zinc-600 hover:text-zinc-900"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                <span className={active === item.id ? (theme === "light" ? "text-indigo-600" : "text-indigo-200") : ""}>
                  {item.label}
                </span>
                <span
                  className={`pointer-events-none absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 bg-indigo-400/80 transition duration-500 ease-out group-hover:scale-x-100 ${
                    active === item.id ? "scale-x-100" : ""
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* 右侧工具 */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <a
              href="https://github.com/kk5858-11"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-white/10 p-2 text-zinc-400 transition hover:border-indigo-400/40 hover:text-indigo-200 sm:inline-flex"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.xiaohongshu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-white/10 p-2 text-zinc-400 transition hover:border-indigo-400/40 hover:text-indigo-200 md:inline-flex"
              aria-label="小红书"
              title="小红书"
            >
              <span className="text-xs font-semibold">红</span>
            </a>
            <a
              href="https://github.com/kk5858-11"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-200 transition hover:bg-indigo-500/20 lg:inline-flex"
            >
              {t.resume}
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-white/10 px-2.5 py-1.5 text-[11px] font-medium text-zinc-400 transition hover:border-indigo-400/40 hover:text-zinc-100"
              title={theme === "dark" ? t.themeLight : t.themeDark}
            >
              {theme === "dark" ? "☾" : "☀"}
            </button>
            <div className="hidden items-center rounded-full border border-white/10 p-0.5 sm:flex">
              <button
                type="button"
                onClick={() => setLocale("zh")}
                className={`rounded-full px-2 py-1 text-[11px] ${locale === "zh" ? "bg-white/15 text-zinc-100" : "text-zinc-500"}`}
              >
                中
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-full px-2 py-1 text-[11px] ${locale === "en" ? "bg-white/15 text-zinc-100" : "text-zinc-500"}`}
              >
                EN
              </button>
            </div>

            {/* 汉堡 */}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-200 transition hover:border-indigo-400/40 lg:hidden"
              aria-expanded={open}
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-4">
                <span className={`absolute left-0 top-0 h-0.5 w-full rounded bg-current transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-full rounded bg-current transition ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 top-3 h-0.5 w-full rounded bg-current transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 移动端抽屉 */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="pointer-events-auto fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="pointer-events-auto fixed bottom-0 right-0 top-0 z-[88] w-[min(88vw,320px)] border-l border-white/10 bg-[#0b0b10]/95 p-6 shadow-2xl backdrop-blur-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            >
              <div className="mt-14 flex flex-col gap-1">
                {mobileItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className={`rounded-xl px-3 py-3 text-left text-sm font-medium transition hover:bg-white/5 ${
                      active === item.id ? "text-indigo-200" : "text-zinc-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="my-3 h-px bg-white/10" />
                <button
                  type="button"
                  onClick={() => {
                    go("service");
                    setOpen(false);
                  }}
                  className="rounded-xl px-3 py-3 text-left text-sm text-zinc-400 transition hover:bg-white/5 hover:text-zinc-200"
                >
                  {t.nav.service}
                </button>
              </div>
              <div className="mt-8 flex gap-2">
                <a
                  href="https://github.com/kk5858-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl border border-white/10 py-2 text-center text-xs text-zinc-300"
                >
                  GitHub
                </a>
                <a
                  href="https://www.xiaohongshu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl border border-white/10 py-2 text-center text-xs text-zinc-300"
                >
                  小红书
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 回到顶部 */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto fixed bottom-6 right-5 z-[85] rounded-full border border-white/15 bg-[#0a0a0d]/80 px-4 py-2 text-xs font-medium text-zinc-200 shadow-lg backdrop-blur-md transition hover:border-indigo-400/50 hover:text-indigo-100"
            onClick={() => go("home")}
          >
            {t.backTop}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
