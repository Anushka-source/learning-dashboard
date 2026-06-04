"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full" aria-label={`Progress: ${progress}%`}>
      {/* Track */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/40 shadow-inner">
        {/* Animated fill */}
        <motion.div
          key={progress}
          className="h-full rounded-full bg-gradient-to-r from-pink-500 to-sky-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: "spring" as const,
            stiffness: 260,
            damping: 24,
            delay: 0.15,
          }}
        />
      </div>
    </div>
  );
}
