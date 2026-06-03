"use client";

import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

export function HeroTile() {
  return (
    <motion.article
      variants={itemVariants}
      className="relative col-span-1 flex flex-col justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-8 md:col-span-2 xl:col-span-2"
    >
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl" />
      
      <h1 className="relative z-10 text-4xl font-bold tracking-tight text-white md:text-5xl">
        Welcome back, Anushka
      </h1>
      <p className="relative z-10 mt-4 text-lg text-zinc-300">
        You are on a <span className="font-bold text-white">12 Day Learning Streak</span>. Keep it up!
      </p>
    </motion.article>
  );
}
