"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { ui } from "@/content/site";
import { DARK_QUERY, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * Light/dark switch. The label is chosen in CSS from <html data-theme> (set before paint by the head
 * script), so server and client render identical markup and nothing flashes on hydration.
 */
export function ThemeToggle() {
  // This page view's explicit choice. It still counts when localStorage is blocked.
  const chosen = useRef<Theme | null>(null);

  // Dev only: React Strict Mode's remount clears data-theme from <html>. A no-op in production.
  useLayoutEffect(() => {
    if (!document.documentElement.hasAttribute("data-theme")) {
      applyTheme(chosen.current ?? savedTheme() ?? systemTheme());
    }
  }, []);

  // Until the visitor picks a theme, keep following the OS setting live.
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const onChange = () => {
      if (chosen.current === null && savedTheme() === null) applyTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    chosen.current = next;
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the choice still holds for this page view.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      data-theme-toggle=""
      className="hidden min-h-6 cursor-pointer items-center gap-2 font-mono text-label text-muted uppercase transition-colors duration-150 themed:inline-flex hover:text-ink"
    >
      <span aria-hidden="true">{ui.themeGlyph}</span>
      <span className="sr-only normal-case">{`${ui.themeSwitch} `}</span>
      <span className="dark:hidden">{ui.themeDark}</span>
      <span className="hidden dark:inline">{ui.themeLight}</span>
    </button>
  );
}
