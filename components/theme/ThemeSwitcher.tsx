"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themes = [
    { id: "bright", label: "Bright", icon: Sun, color: "text-blue-500" },
    { id: "light", label: "Light", icon: Sparkles, color: "text-purple-500" },
    { id: "dark", label: "Dark", icon: Moon, color: "text-slate-300" },
  ] as const;

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];
  const CurrentIcon = currentThemeObj.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-10 w-10 md:h-10 md:w-auto md:px-4 md:gap-2 rounded-xl bg-card border border-border shadow-sm hover:bg-card/80 transition-colors duration-200"
        aria-label="Toggle theme"
      >
        <CurrentIcon size={18} className={currentThemeObj.color} />
        <span className="hidden md:block text-sm font-medium text-text-main">
          {currentThemeObj.label}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-36 rounded-xl bg-card border border-border shadow-lg overflow-hidden z-50 p-1"
          >
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.id;
              
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors duration-150 ${
                    isActive 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-text-muted hover:bg-card/80 hover:text-text-main"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-primary" : t.color} />
                  {t.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
