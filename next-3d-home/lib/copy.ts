/**
 * 中英双语文案（导航 + 各区块标题/摘要）
 */
export type Locale = "zh" | "en";

export const COPY: Record<
  Locale,
  {
    nav: Record<"home" | "about" | "works" | "blog" | "service" | "contact", string>;
    navShort: Record<"home" | "about" | "works" | "blog" | "contact", string>;
    resume: string;
    themeDark: string;
    themeLight: string;
    lang: string;
    backTop: string;
    heroCta: string;
    name: string;
    title: string;
    heroSubtitle: string;
    aboutBody: string;
    skills: string[];
    projects: { id: string; name: string; desc: string }[];
    blogTitle: string;
    blogLead: string;
    blogPosts: { title: string; excerpt: string }[];
    serviceTitle: string;
    serviceLead: string;
    serviceItems: string[];
    contactLead: string;
    contactFormHint: string;
    contactSubmit: string;
    worksTitle: string;
    worksHint: string;
    aboutFlipHint: string;
    aboutKicker: string;
    contactKicker: string;
    namePh: string;
    msgPh: string;
  }
> = {
  zh: {
    nav: {
      home: "首页",
      about: "关于我",
      works: "作品集",
      blog: "博客",
      service: "服务",
      contact: "联系我",
    },
    navShort: { home: "首页", about: "关于", works: "作品", blog: "博客", contact: "联系" },
    resume: "简历",
    themeDark: "深色",
    themeLight: "浅色",
    lang: "语言",
    backTop: "顶部",
    heroCta: "预约一次交流",
    name: "kk",
    title: "AI 训练师 · 3D Web 创意开发",
    heroSubtitle:
      "专注 Prompt 体系、评测与训练数据，让模型从「能跑」走向「可信、好用、可上线」。",
    aboutBody:
      "我帮助团队搭建可复用的 AI 工作流：从提示词工程到评测基准，从标注规范到迭代节奏。用工程化方法降低幻觉与回归风险。",
    skills: ["Prompt Engineering", "Eval & Rubrics", "Data Curation", "RAG", "Next.js", "Three.js"],
    projects: [
      { id: "p1", name: "AI Eval Dashboard", desc: "多模型对比与回归追踪" },
      { id: "p2", name: "Prompt Studio", desc: "模板化提示词与版本管理" },
      { id: "p3", name: "Annotation Pipeline", desc: "标注质检与偏好数据构建" },
    ],
    blogTitle: "博客 / 笔记",
    blogLead: "技术随笔、AI 干货与知识沉淀。",
    blogPosts: [
      { title: "如何用评测集锁住模型迭代", excerpt: "从 rubric 设计到回归门禁的实践清单。" },
      { title: "Prompt 模板的版本化治理", excerpt: "多人协作下保持输出风格一致。" },
      { title: "偏好数据与 RLHF 流程随笔", excerpt: "数据质量比规模更重要。" },
    ],
    serviceTitle: "服务",
    serviceLead: "咨询、定制与落地支持（可按需调整范围）。",
    serviceItems: [
      "AI 训练与评测体系搭建",
      "个人 / 工作室网站与 3D 落地页",
      "文案与品牌叙事（中英）",
      "小团队工作流自动化脚本",
    ],
    contactLead: "一起把 AI 做到「可交付」。",
    contactFormHint: "留下需求与联系方式，我会在 24h 内回复。",
    contactSubmit: "发送（演示粒子）",
    worksTitle: "作品集",
    worksHint: "使用滚轮左右浏览（触控板纵向滑动即可）",
    aboutFlipHint: "点击卡片翻转",
    aboutKicker: "About",
    contactKicker: "Contact",
    namePh: "怎么称呼你",
    msgPh: "想解决什么问题？",
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      works: "Works",
      blog: "Blog",
      service: "Service",
      contact: "Contact",
    },
    navShort: { home: "Home", about: "About", works: "Works", blog: "Blog", contact: "Hi" },
    resume: "Résumé",
    themeDark: "Dark",
    themeLight: "Light",
    lang: "Lang",
    backTop: "Top",
    heroCta: "Book a chat",
    name: "kk",
    title: "AI Trainer · 3D Web",
    heroSubtitle:
      "Prompt systems, evaluation, and training data—moving models from demos to dependable products.",
    aboutBody:
      "I help teams ship reusable AI workflows: prompt engineering, eval benchmarks, annotation playbooks, and iteration cadence—with fewer regressions.",
    skills: ["Prompt Engineering", "Eval & Rubrics", "Data Curation", "RAG", "Next.js", "Three.js"],
    projects: [
      { id: "p1", name: "AI Eval Dashboard", desc: "Compare models and track regressions." },
      { id: "p2", name: "Prompt Studio", desc: "Templated prompts with versioning." },
      { id: "p3", name: "Annotation Pipeline", desc: "Quality gates for preference data." },
    ],
    blogTitle: "Blog / Notes",
    blogLead: "Essays on AI, tooling, and craft.",
    blogPosts: [
      { title: "Locking iterations with eval suites", excerpt: "Rubrics, baselines, and release gates." },
      { title: "Versioning prompt templates", excerpt: "Keeping tone consistent across teams." },
      { title: "Notes on preference data", excerpt: "Quality beats volume." },
    ],
    serviceTitle: "Services",
    serviceLead: "Consulting, builds, and hands-on support.",
    serviceItems: [
      "AI training & evaluation systems",
      "Portfolio / 3D landing sites",
      "Copy & narrative (EN/ZH)",
      "Small-team workflow automation",
    ],
    contactLead: "Let’s ship something reliable.",
    contactFormHint: "Leave a note—I usually reply within 24h.",
    contactSubmit: "Send (demo particles)",
    worksTitle: "Selected Work",
    worksHint: "Scroll horizontally with the wheel (trackpad vertical maps to sideways).",
    aboutFlipHint: "Tap the card to flip",
    aboutKicker: "About",
    contactKicker: "Contact",
    namePh: "Your name",
    msgPh: "What do you want to build?",
  },
};
