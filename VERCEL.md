# 用 Vercel 部署 `next-3d-home`（最快公开链接）

你的仓库根目录是「旧个站」+ 子目录 **`next-3d-home`**（Next.js 3D）。在 Vercel 里只要把**构建根目录**指到子文件夹即可。

## 一次性操作（约 3 分钟）

1. 打开 [https://vercel.com](https://vercel.com) 并登录（建议用 **GitHub** 登录）。
2. **Add New… → Project**，选择仓库 **`kk5858-11/ge-zhan`**（或你的实际仓库名）。
3. 在 **Configure Project** 里找到 **Root Directory**，点 **Edit**，选 **`next-3d-home`**（不要留在仓库根目录）。
4. Framework Preset 应自动识别为 **Next.js**，无需改 `Build` / `Output`（保持默认即可）。
5. 点 **Deploy**。完成后页面顶部会给出 **`https://xxx.vercel.app`** 即公开链接。

## 以后每次更新

把代码 `push` 到 `main` 后，Vercel 会自动重新部署，链接不变。

## 常见问题

- **部署成功但白屏 / 3D 不显示**：多半是浏览器 WebGL 或扩展拦截；换 Chrome 无痕试一次。
- **想绑定自己的域名**：Vercel 项目 → **Settings → Domains** 按提示加 DNS。
