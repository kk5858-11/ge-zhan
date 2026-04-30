import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type TextSegment = {
  text: string;
  className?: string;
};

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

function AboutParagraph() {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const content =
    "Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.";
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

function FeatureInfoCard({ card, index }: { card: FeatureCard; index: number }) {
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
        Learn more <ArrowRight size={16} className="-rotate-45" />
      </a>
    </motion.article>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

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

  const features: FeatureCard[] = [
    {
      number: "01",
      title: "Project Storyboard.",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
      items: [
        "Build visual moodboards in minutes.",
        "Map scenes with flexible timeline blocks.",
        "Share interactive story arcs with your team.",
        "Export references for production sync.",
      ],
    },
    {
      number: "02",
      title: "Smart Critiques.",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
      items: [
        "Receive AI analysis on pacing and visual flow.",
        "Turn feedback into structured creative notes.",
        "Connect directly with your editing tool stack.",
      ],
    },
    {
      number: "03",
      title: "Immersion Capsule.",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
      items: [
        "Silence distracting notifications by project state.",
        "Play ambient soundscapes tuned for deep focus.",
        "Sync your concentration windows with calendar.",
      ],
    },
  ];

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
                { label: "Our story", href: "#hero" },
                { label: "Collective", href: "#about" },
                { label: "Workshops", href: "#features" },
                { label: "Programs", href: "#features" },
                { label: "Inquiries", href: "#features" },
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
                  Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place,
                  status or labels but by passion and hunger to unlock potential through our unique perspectives.
                </motion.p>
                <motion.a
                  href="#about"
                  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-1.5 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: smoothEase }}
                  whileHover={{ y: -2 }}
                >
                  Join the lab
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
          <p className="text-[10px] text-primary sm:text-xs">Visual arts</p>
          <WordsPullUpMultiStyle
            className="mx-auto mt-5 max-w-3xl text-3xl font-normal leading-[0.95] text-[#E1E0CC] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
            segments={[
              { text: "I am Marcus Chen," },
              { text: "a self-taught director.", className: "font-serif italic" },
              { text: "I have skills in color grading, visual effects, and narrative design." },
            ]}
          />
          <AboutParagraph />
        </div>
        </section>

        <section id="features" className="relative min-h-screen overflow-hidden bg-black px-4 py-20 sm:px-6 md:px-10">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <WordsPullUpMultiStyle
            className="text-center text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
            segments={[
              { text: "Studio-grade workflows for visionary creators.", className: "text-[#E1E0CC]" },
              { text: "Built for pure vision. Powered by art.", className: "text-gray-500" },
            ]}
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
              <p className="absolute bottom-5 left-5 text-lg text-[#E1E0CC] sm:text-xl">Your creative canvas.</p>
            </motion.article>

            {features.map((card, index) => (
              <FeatureInfoCard key={card.title} card={card} index={index + 1} />
            ))}
          </div>
        </div>
        </section>
      </main>
    </>
  );
}
