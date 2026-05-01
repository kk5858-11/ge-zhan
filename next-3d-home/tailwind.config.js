/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /** 页面主背景（电影感深色） */
        ink: "#0a0a0d",
        /** 低饱和主色（交互高亮） */
        accent: "#6366f1",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        glow: "0 0 60px -18px rgba(99,102,241,0.85)",
      },
    },
  },
  plugins: [],
};
