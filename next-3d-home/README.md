# kk · 高级感 3D 互动个人主页（Next.js 14）

基于 **Next.js 14（App Router）+ React 18 + TypeScript + React Three Fiber + Drei + Postprocessing + Tailwind + GSAP + Framer Motion** 的单页作品集。

## 最快公开链接：Vercel（推荐）

1. 把本目录 **`next-3d-home`** 推送到你的 GitHub 仓库（见下文「同步到 GitHub」）。
2. 打开 [vercel.com](https://vercel.com) → Import 该仓库 → **Root Directory 选 `next-3d-home`** → Deploy。
3. 部署完成后会得到 **`https://你的项目.vercel.app`**。

仓库根目录下的 **`VERCEL.md`** 有逐步截图式说明（中文）。

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
