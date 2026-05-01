"use client";

/**
 * 全局 UI：主题（深/浅）+ 语言（中/英）
 */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { COPY, type Locale } from "@/lib/copy";

export type Theme = "dark" | "light";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (typeof COPY)["zh"];
};

const SiteUiContext = createContext<Ctx | null>(null);

export function SiteUiProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [locale, setLocale] = useState<Locale>("zh");

  const value = useMemo<Ctx>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme((x) => (x === "dark" ? "light" : "dark")),
      locale,
      setLocale,
      t: COPY[locale],
    }),
    [theme, locale]
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <SiteUiContext.Provider value={value}>{children}</SiteUiContext.Provider>;
}

export function useSiteUi() {
  const v = useContext(SiteUiContext);
  if (!v) throw new Error("useSiteUi must be used within SiteUiProvider");
  return v;
}
