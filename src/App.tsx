import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type TextSegment = {
  text: string;
  className?: string;
};

type Locale = "en" | "zh";

const smoothEase = [0.16, 1, 0.3, 1] as const;
const cardEase = [0.22, 1, 0.36, 1] as const;

function WordsPullUp({
  text,
  className,
  showAsterisk = false,
}: {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;
        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: smoothEase }}
            >
              {showAsterisk && isLastWord ? (
                <>
                  <span className="relative inline-block">
                    {word}
                    <sup className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</sup>
                  </span>
                  &nbsp;
                </>
              ) : (
                <>{word}&nbsp;</>
              )}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

function WordsPullUpMultiStyle({
  segments,
  className,
}: {
  segments: TextSegment[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true });

  const words = useMemo(
    () =>
      segments.flatMap((segment) =>
        segment.text.split(" ").map((word) => ({
          word,
          className: segment.className ?? "",
        }))
      ),
    [segments]
  );

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className ?? ""}`}>
      {words.map((item, index) => (
        <span key={`${item.word}-${index}`} className="inline-block overflow-hidden">
          <motion.span
            className={`inline-block ${item.className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: smoothEase }}
          >
            {item.word}&nbsp;
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function AnimatedLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const charProgress = index / total;
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

function AboutParagraph({ content }: { content: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = content.split("");

  return (
    <p ref={ref} className="mx-auto mt-8 max-w-4xl text-xs leading-relaxed text-[#DEDBC8] sm:text-sm md:text-base">
      {chars.map((char, index) => (
        <AnimatedLetter
          key={`char-${index}`}
          char={char}
          index={index}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

type FeatureCard = {
  number: string;
  title: string;
  icon: string;
  items: string[];
};

function FeatureInfoCard({
  card,
  index,
  learnMoreLabel,
}: {
  card: FeatureCard;
  index: number;
  learnMoreLabel: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.article
      ref={ref}
      className="flex h-full flex-col rounded-2xl bg-[#212121] p-5 transition-transform duration-300 sm:p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: cardEase }}
      whileHover={{ y: -6 }}
    >
      <img src={card.icon} alt={card.title} className="h-10 w-10 rounded-md object-cover sm:h-12 sm:w-12" />
      <div className="mt-5 text-sm text-primary">{card.number}</div>
      <h3 className="mt-2 text-2xl text-[#E1E0CC]">{card.title}</h3>
      <ul className="mt-5 space-y-3">
        {card.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
            <Check size={16} className="mt-0.5 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <a
        href="#features"
        className="mt-auto inline-flex items-center gap-2 pt-8 text-sm text-primary/80 transition-all hover:gap-3 hover:text-primary"
      >
        {learnMoreLabel} <ArrowRight size={16} className="-rotate-45" />
      </a>
    </motion.article>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1600);

    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const copy = {
    en: {
      nav: ["Our story", "Collective", "Workshops", "Programs", "Inquiries"],
      heroDesc:
        "I am kk, an AI trainer focused on making models more helpful, stable, and aligned with real user needs. From prompt architecture to evaluation pipelines, I build practical systems that move AI from demo to dependable product.",
      cta: "Work with kk",
      aboutLabel: "AI training studio",
      aboutSegments: [
        { text: "I am kk," },
        { text: "an AI trainer.", className: "font-serif italic" },
        { text: "I specialize in prompt systems, model evaluation, and training data optimization." },
      ] as TextSegment[],
      aboutParagraph:
        "As an AI trainer, I work on prompt engineering, data annotation strategy, evaluation design, and model behavior refinement. I help teams build more reliable AI workflows, reduce hallucinations, and turn prototypes into production-ready assistants that users can trust.",
      featuresHeadline: [
        { text: "Production-grade AI workflows for modern teams.", className: "text-[#E1E0CC]" },
        { text: "Built for reliability. Tuned by training insight.", className: "text-gray-500" },
      ] as TextSegment[],
      videoCaption: "Train smarter. Ship safer AI.",
      learnMore: "Learn more",
      features: [
        {
          number: "01",
          title: "Prompt Lab.",
          icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
          items: [
            "Design role-based prompt frameworks for complex tasks.",
            "Build reusable prompt templates for real workflows.",
            "Define safe prompt boundaries and fallback strategies.",
            "Document best practices for team-wide consistency.",
          ],
        },
        {
          number: "02",
          title: "Eval Engine.",
          icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
          items: [
            "Create scoring rubrics for quality and factual accuracy.",
            "Run benchmark sets to compare model behavior changes.",
            "Track regressions and improve response reliability.",
          ],
        },
        {
          number: "03",
          title: "Dataset Forge.",
          icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
          items: [
            "Curate high-quality instruction and preference datasets.",
            "Set annotation guidelines for stable label quality.",
            "Support RLHF-style iteration with targeted data updates.",
          ],
        },
      ] as FeatureCard[],
    },
    zh: {
      nav: ["关于我", "能力方向", "训练方案", "合作流程", "联系咨询"],
      heroDesc:
        "我是 kk，一名 AI 训练师，专注让模型更稳定、更实用、更贴近真实用户需求。从 Prompt 架构设计到评测体系搭建，我帮助团队把 AI 从演示阶段推进到可长期上线的产品阶段。",
      cta: "和 kk 合作",
      aboutLabel: "AI 训练工作室",
      aboutSegments: [
        { text: "我是 kk，" },
        { text: "一名 AI 训练师。", className: "font-serif italic" },
        { text: "我专注于 Prompt 体系、模型评测与训练数据优化。" },
      ] as TextSegment[],
      aboutParagraph:
        "我长期参与 Prompt 工程、数据标注策略、评测标准设计与模型行为优化。可以帮助团队降低幻觉、提升回答一致性，并把原型能力沉淀为可靠的生产级 AI 助手体验。",
      featuresHeadline: [
        { text: "面向真实业务的 AI 训练工作流。", className: "text-[#E1E0CC]" },
        { text: "以可靠性为先，由训练经验驱动。", className: "text-gray-500" },
      ] as TextSegment[],
      videoCaption: "训练更聪明，交付更可靠的 AI。",
      learnMore: "了解更多",
      features: [
        {
          number: "01",
          title: "Prompt 实验室",
          icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
          items: [
            "为复杂任务设计角色化 Prompt 框架。",
            "沉淀可复用模板，提升团队执行效率。",
            "定义安全边界与降级策略，减少风险输出。",
            "建立统一规范，保障多人协作一致性。",
          ],
        },
        {
          number: "02",
          title: "评测引擎",
          icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
          items: ["构建质量与事实性评分标准。", "通过基准测试追踪模型改动效果。", "识别回归问题，持续提升稳定性。"],
        },
        {
          number: "03",
          title: "数据工坊",
          icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
          items: ["构建高质量指令与偏好数据集。", "制定标注规范，提升标签一致性。", "支持 RLHF 式迭代，精准补齐薄弱样本。"],
        },
      ] as FeatureCard[],
    },
  } as const;

  const t = copy[locale];

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: smoothEase }}
          >
            <div className="pointer-events-none absolute inset-0 cinematic-grain" />
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[#f4e6c5]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.035, 0, 0.025, 0] }}
              transition={{ duration: 1.2, ease: "easeInOut", times: [0, 0.2, 0.45, 0.7, 1] }}
            />
            <motion.div
              className="relative z-10 text-4xl tracking-[-0.05em] text-[#E1E0CC] sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.9, ease: smoothEase }}
            >
              Prisma*
            </motion.div>
            <div className="absolute right-4 top-4 z-20 inline-flex rounded-full border border-primary/30 bg-black/70 p-1 text-xs">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-full px-3 py-1 transition-colors ${locale === "en" ? "bg-primary text-black" : "text-primary/80"}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLocale("zh")}
                className={`rounded-full px-3 py-1 transition-colors ${locale === "zh" ? "bg-primary text-black" : "text-primary/80"}`}
              >
                中文
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-black text-primary">
        <section id="hero" className="h-screen p-4 md:p-6">
        <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

          <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8">
            <ul className="flex items-center gap-3 text-[10px] sm:gap-6 sm:text-xs md:gap-12 md:text-sm lg:gap-14">
              {[
                { label: t.nav[0], href: "#hero" },
                { label: t.nav[1], href: "#about" },
                { label: t.nav[2], href: "#features" },
                { label: t.nav[3], href: "#features" },
                { label: t.nav[4], href: "#features" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{ color: "rgba(225, 224, 204, 0.8)" }}
                    className="transition-all duration-300 hover:!text-[#E1E0CC] hover:tracking-wide"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-12 items-end gap-4 md:gap-6">
              <div className="col-span-12 md:col-span-8">
                <WordsPullUp
                  text="Prisma"
                  showAsterisk
                  className="text-[26vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
                />
              </div>
              <div className="col-span-12 pb-3 md:col-span-4">
                <motion.p
                  className="text-xs leading-[1.2] text-primary/70 sm:text-sm md:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: smoothEase }}
                >
                  {t.heroDesc}
                </motion.p>
                <motion.a
                  href="#about"
                  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-1.5 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: smoothEase }}
                  whileHover={{ y: -2 }}
                >
                  {t.cta}
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight size={18} className="text-primary" />
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        </section>

        <section id="about" className="bg-black px-4 py-20 sm:px-6 md:px-10">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#101010] px-4 py-14 text-center sm:px-8 sm:py-20 md:px-12">
          <p className="text-[10px] text-primary sm:text-xs">{t.aboutLabel}</p>
          <WordsPullUpMultiStyle
            className="mx-auto mt-5 max-w-3xl text-3xl font-normal leading-[0.95] text-[#E1E0CC] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
            segments={t.aboutSegments}
          />
          <AboutParagraph content={t.aboutParagraph} />
        </div>
        </section>

        <section id="features" className="relative min-h-screen overflow-hidden bg-black px-4 py-20 sm:px-6 md:px-10">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <WordsPullUpMultiStyle
            className="text-center text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
            segments={t.featuresHeadline}
          />

          <div className="mt-12 grid gap-3 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4">
            <motion.article
              className="relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.015 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0, ease: cardEase }}
            >
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
              <p className="absolute bottom-5 left-5 text-lg text-[#E1E0CC] sm:text-xl">{t.videoCaption}</p>
            </motion.article>

            {t.features.map((card, index) => (
              <FeatureInfoCard key={card.title} card={card} index={index + 1} learnMoreLabel={t.learnMore} />
            ))}
          </div>
        </div>
        </section>
      </main>
    </>
  );
}
