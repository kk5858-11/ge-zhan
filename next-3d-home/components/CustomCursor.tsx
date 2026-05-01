"use client";

/**
 * 自定义光标：中心点 + 跟手环（用 DOM 直接更新 transform，避免每帧 setState）
 */
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      rootRef.current?.style.setProperty("opacity", "1");
    };
    const onLeave = () => rootRef.current?.style.setProperty("opacity", "0");

    const loop = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      dotRef.current?.style.setProperty("transform", `translate(${target.current.x}px, ${target.current.y}px)`);
      ringRef.current?.style.setProperty("transform", `translate(${ring.current.x}px, ${ring.current.y}px)`);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[200] opacity-0 mix-blend-difference"
      aria-hidden
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white will-change-transform"
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 will-change-transform"
      />
    </div>
  );
}
