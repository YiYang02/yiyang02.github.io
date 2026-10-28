export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Runs synchronously in <head>, before first paint: the visitor's saved choice, else the OS preference.
 * It always sets data-theme, so CSS can treat a missing attribute as "no JavaScript".
 */
export const themeInitScript = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia(${JSON.stringify(DARK_QUERY)}).matches?"dark":"light";d.setAttribute("data-theme",t)})()`;
