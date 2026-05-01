"use client";

/**
 * 单页主入口：底层全屏 3D + 上层滚动内容
 * GSAP ScrollTrigger：驱动滚动视差时间线（轻量：整体进度驱动 UI）
 */
import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomCursor } from "@/components/CustomCursor";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useIsMobile } from "@/hooks/useIsMobile";

const HeroCanvas = dynamic(() => import("@/components/scene/HeroCanvas").then((m) => m.HeroCanvas), {
  ssr: false,
  loading: () => null,
});

export function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mobile = useIsMobile();

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

  return (
    <div ref={rootRef} className="relative min-h-screen bg-[#0a0a0d] text-zinc-100">
      {/* 全屏 3D：移动端关闭重后期、降低动效 */}
      <HeroCanvas postFx={!mobile} reducedMotion={mobile} />

      <CustomCursor />

      {/* 前景内容：半透明渐变遮罩，保证文字可读又不完全挡住 3D */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-[#0a0a0d]/10 via-transparent to-[#0a0a0d]/85" />

      <div className="pointer-events-none relative z-10 flex min-h-screen flex-col">
        <div data-parallax className="pointer-events-auto">
          <HeroSection />
          <AboutSection />
          <PortfolioSection />
          <ContactSection />
        </div>
        <footer className="pointer-events-auto pb-10 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} kk · Built with Next.js 14 + R3F
        </footer>
      </div>
    </div>
  );
}
