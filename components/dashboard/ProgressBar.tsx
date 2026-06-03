"use client";

import { motion } from "framer-motion";

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
      />
    </div>
  );
}
