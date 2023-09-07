"use client";
import { Theme } from "@/types";
import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

// type Props = {}

const DarkMode = () => {
  const [theme, setTheme] = useState<Theme | undefined>();
  useEffect(() => {
    setTheme(localStorage.theme || "auto");
  }, []);

  const handleThemeToggle = (v: Theme) => {
    setTheme(v);
    localStorage.theme = v;
    // reset
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.remove("light");
    if (v !== "auto") {
      document.documentElement.classList.add(v);
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.add(isDark ? "dark" : "light");
    }
  };
  return (
    <button onClick={handleThemeToggle.bind(null, theme == "dark" ? "light" : "dark")}>
      {theme == "dark" ? `Light Mode` : `Dark Mode`}
    </button>
  );
};

export default DarkMode;
