"use client";

/**
 * 电影级后期：Bloom + 景深 + 色调映射
 * 移动端默认关闭 Bloom/DOF 以减轻 GPU 压力
 */
import { EffectComposer, Bloom, DepthOfField, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

type Props = {
  enabled: boolean;
};

export function ScenePostFX({ enabled }: Props) {
  if (!enabled) {
    return (
      <EffectComposer multisampling={0}>
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={4}>
      <Bloom intensity={1.45} luminanceThreshold={0.18} mipmapBlur />
      <DepthOfField focusDistance={0.012} focalLength={0.018} bokehScale={2.8} height={480} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
