/** @type {import('next').NextConfig} */
/**
 * GitHub Pages 子路径部署时，在 CI 里设置：
 *   NEXT_STATIC_BASE_PATH=/ge-zhan/next-3d
 * 本地开发不设该变量，根路径为 /，方便调试。
 */
const basePath = process.env.NEXT_STATIC_BASE_PATH || "";

const nextConfig = {
  /** 输出静态 HTML，可托管在 GitHub Pages（无需 Node 服务器） */
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  /** 供客户端拼接 public 资源路径（子路径部署时与 basePath 一致） */
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: { unoptimized: true },
  /** R3F / three 在 Next 中建议显式转译，减少打包兼容问题 */
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
};

export default nextConfig;
