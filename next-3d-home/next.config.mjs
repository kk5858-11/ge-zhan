/** @type {import('next').NextConfig} */
const nextConfig = {
  /** R3F / three 在 Next 中建议显式转译，减少打包兼容问题 */
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
};

export default nextConfig;
