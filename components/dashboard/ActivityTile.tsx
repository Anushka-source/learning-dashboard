"use client";

import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

// Fixed activity data — no Math.random to avoid hydration errors
const activityLevels = [
  "opacity-10", "opacity-30", "opacity-60", "opacity-10", "opacity-100", "opacity-30", "opacity-60",
  "opacity-60", "opacity-10", "opacity-30", "opacity-100", "opacity-30", "opacity-10", "opacity-60",
  "opacity-10", "opacity-30", "opacity-100", "opacity-60", "opacity-10", "opacity-30", "opacity-100",
  "opacity-30", "opacity-10", "opacity-60", "opacity-10", "opacity-100", "opacity-30", "opacity-10",
  "opacity-60", "opacity-100", "opacity-30", "opacity-10", "opacity-10", "opacity-60", "opacity-30",
];

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ActivityTile() {
  return (
    <motion.article
      variants={itemVariants}
      className="col-span-1 flex flex-col justify-between rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl xl:col-span-2"
    >
      <div>
        <h2 className="mb-1 text-xl font-bold text-slate-800">Activity</h2>
        <p className="mb-5 text-sm text-slate-500">
          Your learning contributions this month
        </p>
      </div>

      {/* Day-of-week labels */}
      <div className="grid grid-cols-7 gap-2 mb-1.5">
        {dayLabels.map((d) => (
          <p key={d} className="text-center text-[10px] font-medium text-slate-400">
            {d}
          </p>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="grid grid-cols-7 gap-2">
        {activityLevels.map((opacityClass, i) => (
          <div
            key={i}
            className={`aspect-square rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 ${opacityClass} cursor-default transition-opacity duration-200 hover:opacity-100`}
            title={`Day ${i + 1}`}
          />
        ))}
      </div>
    </motion.article>
  );
}