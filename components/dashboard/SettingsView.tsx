"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { User, Palette, Bell, Moon, Sun, Monitor, ChevronRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

type Theme = "Light" | "Dark" | "System";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
        checked ? "bg-indigo-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-md transition-all duration-300 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function SettingsView() {
  const [theme, setTheme] = useState<Theme>("System");
  const [notifications, setNotifications] = useState({
    streakReminders: true,
    courseUpdates: true,
    weeklyReport: false,
    achievements: true,
  });

  const themeOptions: { label: Theme; icon: React.ReactNode }[] = [
    { label: "Light", icon: <Sun size={16} /> },
    { label: "Dark", icon: <Moon size={16} /> },
    { label: "System", icon: <Monitor size={16} /> },
  ];

  const notifItems = [
    { key: "streakReminders" as const, label: "Streak Reminders", desc: "Daily nudge to keep your streak alive" },
    { key: "courseUpdates" as const, label: "Course Updates", desc: "When new content is added to your courses" },
    { key: "weeklyReport" as const, label: "Weekly Report", desc: "Summary of your learning progress" },
    { key: "achievements" as const, label: "Achievements", desc: "Celebrate milestones and badges" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 max-w-2xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
        <p className="mt-1 text-slate-500">Manage your preferences and profile</p>
      </motion.div>

      {/* Profile Card */}
      <motion.section
        variants={itemVariants}
        aria-label="Profile"
        className="rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-xl"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100/70">
            <User size={20} className="text-indigo-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Profile</h2>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-2xl font-bold text-white shadow-lg">
            A
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-slate-800">Anushka</p>
            <p className="text-sm text-slate-500">anushka@example.com</p>
            <p className="mt-1 text-xs font-medium text-indigo-600">12 Day Streak 🔥</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 rounded-xl border border-white/40 bg-white/40 px-4 py-2 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-all hover:bg-white/60 hover:shadow-md"
          >
            Edit <ChevronRight size={14} />
          </button>
        </div>
      </motion.section>

      {/* Theme Card */}
      <motion.section
        variants={itemVariants}
        aria-label="Theme preference"
        className="rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-xl"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100/70">
            <Palette size={20} className="text-violet-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Theme Preference</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map(({ label, icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setTheme(label)}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-sm font-semibold transition-all duration-200 ${
                theme === label
                  ? "border-indigo-400 bg-indigo-500 text-white shadow-lg"
                  : "border-white/40 bg-white/30 text-slate-600 hover:bg-white/50 hover:shadow-md"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Notifications Card */}
      <motion.section
        variants={itemVariants}
        aria-label="Notification settings"
        className="rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-xl"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-100/70">
            <Bell size={20} className="text-pink-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Notifications</h2>
        </div>

        <ul className="flex flex-col divide-y divide-white/20">
          {notifItems.map(({ key, label, desc }) => (
            <li key={key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-slate-700">{label}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
              <Toggle
                checked={notifications[key]}
                onChange={() =>
                  setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
                }
              />
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  );
}
