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

const activityLevels = [
  "opacity-10", "opacity-30", "opacity-60", "opacity-10", "opacity-100", "opacity-30", "opacity-60",
  "opacity-60", "opacity-10", "opacity-30", "opacity-100", "opacity-30", "opacity-10", "opacity-60",
  "opacity-10", "opacity-30", "opacity-100", "opacity-60", "opacity-10", "opacity-30", "opacity-100",
  "opacity-30", "opacity-10", "opacity-60", "opacity-10", "opacity-100", "opacity-30", "opacity-10",
  "opacity-60", "opacity-100", "opacity-30", "opacity-10", "opacity-10", "opacity-60", "opacity-30",
];

export function ActivityTile() {
  return (
    <motion.article
      variants={itemVariants}
      className="col-span-1 flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm xl:col-span-2"
    >
      <div>
        <h2 className="mb-2 text-xl font-semibold text-white">Activity</h2>
        <p className="mb-6 text-sm text-zinc-400">
          Your learning contributions this month
        </p>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {activityLevels.map((opacityClass, i) => (
          <div
            key={i}
            className={`aspect-square rounded-md bg-indigo-500 ${opacityClass} transition-opacity duration-300 hover:opacity-100`}
          />
        ))}
      </div>
    </motion.article>
  );
}