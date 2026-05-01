/**
 * 导航与 3D 场景轻联动：根据区块 id 驱动目标偏航角（由 AbstractHero 内做阻尼跟随）
 */
type Listener = () => void;

const listeners = new Set<Listener>();

/** 各锚点对应的额外 Y 轴旋转偏移（弧度），可按视觉微调 */
const SECTION_YAW: Record<string, number> = {
  home: 0,
  about: 0.55,
  works: -0.48,
  blog: 0.22,
  service: -0.18,
  contact: 0.62,
};

let targetYaw = 0;

export function getSceneTargetYaw() {
  return targetYaw;
}

export function setSceneSection(sectionId: string) {
  targetYaw = SECTION_YAW[sectionId] ?? 0;
  listeners.forEach((fn) => fn());
}

export function subscribeSceneNudge(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
