"use client";

import { motion } from "framer-motion";
import { Home, BookOpen, Settings, BarChart } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Home", icon: Home },
  { name: "Courses", icon: BookOpen },
  { name: "Analytics", icon: BarChart },
  { name: "Settings", icon: Settings },
];

export function Sidebar() {
  const [active, setActive] = useState("Home");

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 z-50 w-full border-t border-white/10 bg-black/80 p-4 backdrop-blur-md md:hidden">
        <ul className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <li key={item.name} className="relative">
                <button
                  onClick={() => setActive(item.name)}
                  className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                    isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-[10px]">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="mobile-active"
                      className="absolute inset-0 -z-10 rounded-xl bg-white/10"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Tablet/Desktop Sidebar */}
      <nav className="hidden h-screen flex-col border-r border-white/10 bg-black/50 p-4 backdrop-blur-md md:flex md:w-20 xl:w-64 fixed left-0 top-0 z-50">
        <div className="mb-10 mt-4 flex items-center justify-center xl:justify-start xl:px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-xl">
            L
          </div>
          <span className="hidden xl:block ml-3 font-bold text-xl tracking-wider text-white">LEARN</span>
        </div>

        <ul className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <li key={item.name}>
                <button
                  onClick={() => setActive(item.name)}
                  className={`relative flex w-full items-center gap-4 rounded-xl px-4 py-3 transition-colors ${
                    isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  } md:justify-center xl:justify-start`}
                >
                  <Icon size={24} />
                  <span className="hidden xl:block text-sm font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="desktop-active"
                      className="absolute inset-0 -z-10 rounded-xl bg-white/10"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
