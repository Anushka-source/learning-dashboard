"use client";

import { motion } from "framer-motion";
import { Home, BookOpen, Settings, BarChart } from "lucide-react";
import { ActiveView } from "./DashboardShell";

interface SidebarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

const navItems: { name: ActiveView; icon: React.ElementType }[] = [
  { name: "Home", icon: Home },
  { name: "Courses", icon: BookOpen },
  { name: "Analytics", icon: BarChart },
  { name: "Settings", icon: Settings },
];

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-0 z-50 w-full border-t border-white/30 bg-white/15 p-2 shadow-2xl backdrop-blur-xl md:hidden"
      >
        <ul role="list" className="flex justify-around">
          {navItems.map(({ name, icon: Icon }) => {
            const isActive = activeView === name;
            return (
              <li key={name}>
                <button
                  type="button"
                  aria-label={name}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onNavigate(name)}
                  className={`relative flex cursor-pointer flex-col items-center gap-1 rounded-xl px-4 py-2 transition-colors duration-200 ${
                    isActive
                      ? "text-pink-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mobile-active-highlight"
                      className="absolute inset-0 -z-10 rounded-xl border border-white/40 bg-white/40 shadow-sm backdrop-blur-md"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                  <Icon size={20} aria-hidden="true" />
                  <span className="text-[10px] font-semibold">{name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Tablet / Desktop Sidebar */}
      <nav
        aria-label="Desktop navigation"
        className="fixed left-0 top-0 z-50 hidden h-screen flex-col border-r border-white/30 bg-white/15 p-4 shadow-2xl backdrop-blur-xl md:flex md:w-20 xl:w-64"
      >
        {/* Logo */}
        <div className="mb-10 mt-4 flex items-center justify-center xl:justify-start xl:px-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-sky-400 text-xl font-bold text-white shadow-lg">
            L
          </div>
          <span className="ml-3 hidden bg-gradient-to-r from-pink-500 to-sky-400 bg-clip-text text-xl font-bold tracking-wider text-transparent xl:block">
            LEARN
          </span>
        </div>

        {/* Nav items */}
        <ul role="list" className="flex flex-col gap-1">
          {navItems.map(({ name, icon: Icon }) => {
            const isActive = activeView === name;
            return (
              <li key={name}>
                <button
                  type="button"
                  aria-label={name}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onNavigate(name)}
                  className={`relative flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-3 transition-colors duration-200 md:justify-center xl:justify-start ${
                    isActive
                      ? "text-pink-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="desktop-active-highlight"
                      className="absolute inset-0 -z-10 rounded-xl border border-white/40 bg-white/40 shadow-sm backdrop-blur-md"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                  <Icon size={22} aria-hidden="true" />
                  <span className="hidden text-sm font-semibold xl:block">
                    {name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Footer hint */}
        <div className="mt-auto hidden xl:block px-4 pb-4">
          <div className="rounded-2xl border border-white/40 bg-white/30 backdrop-blur-md p-4 text-center">
            <p className="text-xs font-semibold text-pink-600">🎯 Goal</p>
            <p className="mt-1 text-xs text-slate-600">
              Complete 3 courses this month
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
