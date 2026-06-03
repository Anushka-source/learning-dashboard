"use client";

import { Course } from "@/types/course";
import * as LucideIcons from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { motion, Variants } from "framer-motion";

const DynamicIcon = ({ name }: { name: string }) => {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Book;
  return <IconComponent className="text-zinc-300" size={24} />;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

export function CourseCard({ course }: { course: Course }) {
  return (
    <motion.article
      variants={itemVariants}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-500 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 group-hover:opacity-100" />
      
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
          <DynamicIcon name={course.icon_name} />
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400">
          In Progress
        </span>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white tracking-tight">{course.title}</h2>
        <div className="mt-6 flex items-center justify-between text-sm text-zinc-400 mb-2">
          <span>Completion</span>
          <span className="font-medium text-white">{course.progress}%</span>
        </div>
        <ProgressBar progress={course.progress} />
      </div>
    </motion.article>
  );
}
