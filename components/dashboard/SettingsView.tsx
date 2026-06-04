"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { User, Palette, Bell, Moon, Sun, Monitor, ChevronRight } from "lucide-react";
import { Theme } from "./DashboardShell";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};


function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 ${
        checked ? "bg-gradient-to-r from-pink-500 to-sky-400" : "bg-slate-200"
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

/* Glassmorphism section card */
function GlassSection({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <motion.section
      variants={itemVariants}
      aria-label={label}
      className="rounded-3xl border border-white/30 bg-white/20 backdrop-blur-xl p-6 shadow-xl"
    >
      {children}
    </motion.section>
  );
}

interface SettingsViewProps {
  selectedTheme: Theme;
  setSelectedTheme: (theme: Theme) => void;
}

export function SettingsView({ selectedTheme, setSelectedTheme }: SettingsViewProps) {
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
      <GlassSection label="Profile">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-500/10">
            <User size={20} className="text-pink-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Profile</h2>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-sky-400 text-2xl font-bold text-white shadow-lg">
            A
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-slate-800">Anushka</p>
            <p className="text-sm text-slate-500">anushka@example.com</p>
            <p className="mt-1 text-xs font-medium text-pink-600">12 Day Streak 🔥</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 rounded-xl border border-white/40 bg-white/40 backdrop-blur-md px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-white/60 hover:text-slate-800 hover:shadow-md"
          >
            Edit <ChevronRight size={14} />
          </button>
        </div>
      </GlassSection>

      {/* Theme Card */}
      <GlassSection label="Theme preference">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10">
            <Palette size={20} className="text-sky-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Theme Preference</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map(({ label, icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setSelectedTheme(label)}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-sm font-semibold transition-all duration-200 ${
                selectedTheme === label
                  ? "border-pink-400/60 bg-gradient-to-br from-pink-500 to-sky-400 text-white shadow-lg scale-[1.03]"
                  : "border-white/40 bg-white/30 backdrop-blur-md text-slate-600 hover:bg-white/50 hover:text-slate-800 hover:shadow-md"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </GlassSection>

      {/* Notifications Card */}
      <GlassSection label="Notification settings">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10">
            <Bell size={20} className="text-blue-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Notifications</h2>
        </div>

        <ul className="flex flex-col divide-y divide-white/30">
          {notifItems.map(({ key, label, desc }) => (
            <li key={key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-slate-800">{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
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
      </GlassSection>
    </motion.div>
  );
}
