"use client";

import { Course } from "@/types/course";
import * as LucideIcons from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { motion, Variants } from "framer-motion";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { deleteCourseAction } from "@/app/actions/courses";
import { useState } from "react";

const DynamicIcon = ({ name }: { name: string }) => {
  const IconComponent =
    (LucideIcons as Record<string, any>)[name] ?? LucideIcons.Book;
  return <IconComponent className="text-pink-500" size={22} />;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

interface CourseCardProps {
  course: Course;
  onEdit?: () => void;
  onSuccess?: (msg: string) => void;
  onError?: (msg: string) => void;
}

export function CourseCard({ course, onEdit, onSuccess, onError }: CourseCardProps) {
  const isComplete = course.progress === 100;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${course.title}"?`)) return;
    
    setIsDeleting(true);
    try {
      const result = await deleteCourseAction(course.id);
      if (result.success) {
        onSuccess?.("Course deleted successfully.");
      } else {
        onError?.(result.error || "Failed to delete course.");
      }
    } catch (err) {
      onError?.("An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.article
      variants={itemVariants}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/30 bg-white/20 backdrop-blur-xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-pink-400/0 to-sky-400/0 opacity-0 transition-opacity duration-300 group-hover:from-pink-400/10 group-hover:to-sky-400/10 group-hover:opacity-100" />

      {/* Icon + status badge */}
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-white/40 backdrop-blur-md shadow-inner transition-colors group-hover:bg-pink-50/60">
          <DynamicIcon name={course.icon_name} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
              isComplete
                ? "border-sky-500/30 bg-sky-500/10 text-sky-600"
                : "border-pink-500/30 bg-pink-500/10 text-pink-600"
            }`}
          >
            {isComplete ? "✓ Completed" : "In Progress"}
          </span>
          <div className="flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {onEdit && (
              <button
                onClick={onEdit}
                className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100/50 hover:text-slate-700"
                title="Edit Course"
              >
                <Pencil size={16} />
              </button>
            )}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-red-100/50 hover:text-red-500 disabled:opacity-50"
              title="Delete Course"
            >
              {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-5">
        <h2 className="text-lg font-bold tracking-tight text-slate-800">
          {course.title}
        </h2>

        {/* Percentage label row */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
            Completion
          </span>
          <span
            className={`text-sm font-extrabold ${
              isComplete ? "text-sky-600" : "text-pink-600"
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
