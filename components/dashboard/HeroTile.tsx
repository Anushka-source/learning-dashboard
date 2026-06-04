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
      className="relative col-span-1 flex flex-col justify-center overflow-hidden rounded-3xl border border-white/40 bg-white/20 backdrop-blur-xl bg-gradient-to-br from-pink-400/40 via-white/30 to-sky-400/30 p-8 shadow-[0_0_40px_-10px_rgba(236,72,153,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_-10px_rgba(236,72,153,0.4)] md:col-span-2 xl:col-span-2"
    >
      {/* Decorative floating circles */}
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/40 blur-2xl" />
      <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-white/40 blur-2xl" />
      <div className="absolute right-1/3 top-1/4 h-20 w-20 rounded-full border border-white/40 bg-white/20 backdrop-blur-md" />
      <div className="absolute bottom-6 right-10 h-10 w-10 rounded-full border border-white/40 bg-white/20 backdrop-blur-md" />

      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-1.5 text-sm font-medium text-slate-800 backdrop-blur-sm shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-pink-500" />
          12 Day Learning Streak 🔥
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 md:text-5xl drop-shadow-sm">
          Welcome back,
          <span className="block text-slate-700">
            Anushka
          </span>
        </h1>
        <p className="mt-4 max-w-sm text-base text-slate-600 font-medium">
          You&apos;re making incredible progress. Keep the momentum going!
        </p>
      </div>
    </motion.article>
  );
}
