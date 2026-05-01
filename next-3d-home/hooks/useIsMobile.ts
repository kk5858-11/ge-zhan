"use client";

import { useEffect, useState } from "react";

/**
 * 简单移动端判断：用于降级 3D（关闭部分后期、降低 DPR）
 */
export function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return mobile;
}
