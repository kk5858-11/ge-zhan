"use client";

/**
 * 全屏 3D Canvas：环境光 HDR、软阴影、轨道控制（阻尼）
 * 与页面内容分层：Canvas 固定底层，UI 在上层滚动
 */
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, SoftShadows } from "@react-three/drei";
import { Suspense } from "react";
import type { Theme } from "@/components/providers/SiteUiProvider";
import { AbstractHero } from "./AbstractHero";
import { ScenePostFX } from "./ScenePostFX";

type Props = {
  /** 是否启用完整后期（桌面建议 true） */
  postFx: boolean;
  /** 移动端简化 */
  reducedMotion: boolean;
  /** 与导航栏主题切换联动 */
  theme: Theme;
};

export function HeroCanvas({ postFx, reducedMotion, theme }: Props) {
  const bg = theme === "light" ? "#e4e4e7" : "#0a0a0d";
  const amb = theme === "light" ? 0.55 : 0.35;

  return (
    <div className="pointer-events-auto fixed inset-0 z-0 h-[100dvh] w-full">
      <Canvas
        shadows
        camera={{ position: [0, 0.2, 6.2], fov: 42, near: 0.1, far: 100 }}
        dpr={reducedMotion ? [1, 1.25] : [1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"
      >
        <color attach="background" args={[bg]} />
        <ambientLight intensity={amb} />
        <spotLight
          castShadow
          position={[6, 8, 4]}
          angle={0.35}
          penumbra={0.9}
          intensity={1.35}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          color="#e0e7ff"
        />
        <spotLight position={[-5, 2, -3]} intensity={0.45} color="#6366f1" />

        <Suspense fallback={null}>
          {/* HDR 环境：提供金属/玻璃反射 */}
          <Environment preset="city" />
          <AbstractHero reducedMotion={reducedMotion} />
        </Suspense>

        {/* 地面接触阴影，增强电影感 */}
        <ContactShadows opacity={0.45} scale={12} blur={2.5} far={6} color="#000000" />

        {!reducedMotion && <SoftShadows size={40} samples={12} focus={0.6} />}

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 3}
          minAzimuthAngle={-0.7}
          maxAzimuthAngle={0.7}
          dampingFactor={0.08}
          rotateSpeed={0.65}
          enableDamping
        />

        <Suspense fallback={null}>
          <ScenePostFX enabled={postFx} />
        </Suspense>
      </Canvas>
    </div>
  );
}
