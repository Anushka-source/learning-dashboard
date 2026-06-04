"use client";

import { motion } from "framer-motion";

interface BackgroundBlobsProps {
  isDark?: boolean;
}

export function BackgroundBlobs({ isDark = false }: BackgroundBlobsProps) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full blur-3xl ${
          isDark ? "bg-pink-900/40" : "bg-pink-300/50"
        }`}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className={`absolute -right-40 top-1/3 h-[450px] w-[450px] rounded-full blur-3xl ${
          isDark ? "bg-sky-900/40" : "bg-sky-300/50"
        }`}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, 15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className={`absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full blur-3xl ${
          isDark ? "bg-blue-900/30" : "bg-blue-300/40"
        }`}
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], x: [0, -15, 0], y: [0, -25, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className={`absolute -bottom-20 right-1/4 h-[350px] w-[350px] rounded-full blur-3xl ${
          isDark ? "bg-slate-700/30" : "bg-pink-200/50"
        }`}
      />
    </div>
  );
}
