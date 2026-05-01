/**
 * 用户提供的超现实 / 电影感配图（位于 public/images/art/）
 * 文件名 art-01 … art-06 与仓库内资源一一对应
 */
export const ART_PATHS = [
  "/images/art/art-01.png",
  "/images/art/art-02.png",
  "/images/art/art-03.png",
  "/images/art/art-04.png",
  "/images/art/art-05.png",
  "/images/art/art-06.png",
] as const;

export function publicUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${path}`;
}
