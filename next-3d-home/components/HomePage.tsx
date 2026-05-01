"use client";

/**
 * 单页主入口：全局 Provider、固定导航、底层 3D、各锚点区块
 */
import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteUiProvider, useSiteUi } from "@/components/providers/SiteUiProvider";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useIsMobile } from "@/hooks/useIsMobile";

const HeroCanvas = dynamic(() => import("@/components/scene/HeroCanvas").then((m) => m.HeroCanvas), {
  ssr: false,
  loading: () => null,
});

export function HomePage() {
  return (
    <SiteUiProvider>
      <HomePageInner />
    </SiteUiProvider>
  );
}

function HomePageInner() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mobile = useIsMobile();
  const { theme } = useSiteUi();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-parallax]",
        { y: 40, opacity: 0.85 },
        {
          y: -40,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const pageBg =
    theme === "light"
      ? "bg-[#f4f4f5] text-zinc-900"
      : "bg-[#0a0a0d] text-zinc-100";

  return (
    <div ref={rootRef} className={`relative min-h-screen ${pageBg}`}>
      <HeroCanvas postFx={!mobile} reducedMotion={mobile} theme={theme} />

      <Navbar />

      <CustomCursor />

      <div
        className={`pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b ${
          theme === "light"
            ? "from-white/30 via-transparent to-[#f4f4f5]/90"
            : "from-[#0a0a0d]/10 via-transparent to-[#0a0a0d]/85"
        }`}
      />

      <div className="pointer-events-none relative z-10 flex min-h-screen flex-col">
        <div data-parallax className="pointer-events-auto">
          <HeroSection />
          <AboutSection />
          <PortfolioSection />
          <BlogSection />
          <ServiceSection />
          <ContactSection />
        </div>
        <footer
          className={`pointer-events-auto pb-10 text-center text-xs ${
            theme === "light" ? "text-zinc-500" : "text-zinc-600"
          }`}
        >
          © {new Date().getFullYear()} kk · Next.js 14 + R3F
        </footer>
      </div>
    </div>
  );
}
