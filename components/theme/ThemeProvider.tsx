"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "bright" | "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("bright");

  useEffect(() => {
    // Read the theme from the document element since it was set by our blocking script
    const currentTheme = document.documentElement.getAttribute("data-theme") as Theme;
    if (currentTheme && ["bright", "light", "dark"].includes(currentTheme)) {
      setThemeState(currentTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("learning-dashboard-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
