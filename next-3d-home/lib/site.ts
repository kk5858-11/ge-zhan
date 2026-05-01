/**
 * 站点全局文案与配置（可按需修改为你的真实信息）
 */
export const SITE = {
  /** 显示名 */
  name: "kk",
  /** 一句话身份 */
  title: "AI 训练师 · 3D Web 创意开发",
  /** Hero 副标题 */
  heroSubtitle:
    "专注 Prompt 体系、评测与训练数据，让模型从「能跑」走向「可信、好用、可上线」。",
  /** 关于段落 */
  aboutBody:
    "我帮助团队搭建可复用的 AI 工作流：从提示词工程到评测基准，从标注规范到迭代节奏。用工程化方法降低幻觉与回归风险。",
  /** 技能标签 */
  skills: ["Prompt Engineering", "Eval & Rubrics", "Data Curation", "RAG", "Next.js", "Three.js"],
  /** 作品集条目 */
  projects: [
    { id: "p1", name: "AI Eval Dashboard", desc: "多模型对比与回归追踪" },
    { id: "p2", name: "Prompt Studio", desc: "模板化提示词与版本管理" },
    { id: "p3", name: "Annotation Pipeline", desc: "标注质检与偏好数据构建" },
  ],
} as const;
