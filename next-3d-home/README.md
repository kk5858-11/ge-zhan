# kk · 高级感 3D 互动个人主页（Next.js 14）

基于 **Next.js 14（App Router）+ React 18 + TypeScript + React Three Fiber + Drei + Postprocessing + Tailwind + GSAP + Framer Motion** 的单页作品集。

## 公开链接（不登录 Vercel 也可用）

推送本仓库 `main` 后，GitHub Actions 会把 **Next 静态导出**合并进 Pages，地址为：

**[https://kk5858-11.github.io/ge-zhan/next-3d/](https://kk5858-11.github.io/ge-zhan/next-3d/)**  
（若仓库名不是 `ge-zhan`，请把路径里的 `ge-zhan` 换成你的仓库名。）

## 可选：Vercel（需能登录 vercel.com）

1. Import 仓库 → **Root Directory 选 `next-3d-home`** → Deploy。  
2. 详见仓库根目录 **`VERCEL.md`**。

## 本地启动

```bash
cd next-3d-home
npm install
npm run dev
```

浏览器打开：`http://localhost:3000`

## 生产构建

```bash
npm run build
npm run start
```

## 同步到 GitHub（两种常见方式）

### 方式 A：作为子目录并入你现有仓库（推荐）

在仓库根目录：

```bash
git add next-3d-home
git commit -m "feat: add Next.js 14 3D portfolio (next-3d-home)"
git push origin main
```

### 方式 B：单独新建一个 GitHub 仓库

```bash
cd next-3d-home
git init
git add .
git commit -m "chore: initial 3D portfolio"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<新仓库名>.git
git push -u origin main
```

## 自定义文案

编辑 `lib/site.ts`：姓名、简介、技能、项目卡片等。

## 技术说明（性能）

- 桌面端默认开启 **Bloom + 景深 + ToneMapping**；移动端自动降级（`useIsMobile`）。
- 3D Canvas 使用 `next/dynamic` 且 `ssr: false`，避免服务端渲染 WebGL 报错。
