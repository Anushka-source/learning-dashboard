"use client";

import { Course } from "@/types/course";
import * as LucideIcons from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { motion, Variants } from "framer-motion";

const DynamicIcon = ({ name }: { name: string }) => {
  const IconComponent =
    (LucideIcons as Record<string, any>)[name] ?? LucideIcons.Book;
  return <IconComponent className="text-indigo-600" size={22} />;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

export function CourseCard({ course }: { course: Course }) {
  const isComplete = course.progress === 100;

  return (
    <motion.article
      variants={itemVariants}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/0 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:from-indigo-500/10 group-hover:to-violet-500/10 group-hover:opacity-100" />

      {/* Icon + status badge */}
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-white/40 shadow-inner backdrop-blur-sm transition-colors group-hover:bg-white/60">
          <DynamicIcon name={course.icon_name} />
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
            isComplete
              ? "border-emerald-200/50 bg-emerald-50/60 text-emerald-600"
              : "border-indigo-200/50 bg-indigo-50/60 text-indigo-600"
          }`}
        >
          {isComplete ? "✓ Completed" : "In Progress"}
        </span>
      </div>

      {/* Title */}
      <div className="mt-5">
        <h2 className="text-lg font-bold tracking-tight text-slate-800">
          {course.title}
        </h2>

        {/* Percentage label row */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Completion
          </span>
          <span
            className={`text-sm font-extrabold ${
              isComplete ? "text-emerald-600" : "text-indigo-600"
            }`}
          >
            {course.progress}%
          </span>
        </div>

        {/* Animated progress bar */}
        <div className="mt-2">
          <ProgressBar progress={course.progress} />
        </div>
      </div>
    </motion.article>
  );
}
