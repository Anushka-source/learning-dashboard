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

export function HeroTile() {
  return (
    <motion.article
      variants={itemVariants}
      className="relative col-span-1 flex flex-col justify-center overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/20 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:col-span-2 xl:col-span-2"
    >
      {/* Decorative floating circles */}
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-indigo-400/20 blur-2xl" />
      <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-purple-400/20 blur-2xl" />
      <div className="absolute right-1/3 top-1/4 h-20 w-20 rounded-full border border-white/20 bg-white/10" />
      <div className="absolute bottom-6 right-10 h-10 w-10 rounded-full border border-white/20 bg-white/10" />

      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-sm font-medium text-indigo-700 backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
          12 Day Learning Streak 🔥
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 md:text-5xl">
          Welcome back,
          <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Anushka
          </span>
        </h1>
        <p className="mt-4 max-w-sm text-base text-slate-600">
          You&apos;re making incredible progress. Keep the momentum going!
        </p>
      </div>
    </motion.article>
  );
}
