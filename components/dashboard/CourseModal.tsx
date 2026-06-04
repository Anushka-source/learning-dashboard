"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Course } from "@/types/course";
import { useState } from "react";
import { addCourseAction, updateCourseAction } from "@/app/actions/courses";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCourse?: Course | null;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function CourseModal({ isOpen, onClose, editingCourse, onSuccess, onError }: CourseModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);

    try {
      let result;
      if (editingCourse) {
        result = await updateCourseAction(editingCourse.id, formData);
      } else {
        result = await addCourseAction(formData);
      }

      if (result.success) {
        onSuccess(`Course successfully ${editingCourse ? "updated" : "added"}!`);
        onClose();
      } else {
        onError(result.error || "An error occurred.");
      }
    } catch (err) {
      onError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal content */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md overflow-hidden rounded-3xl border border-white/40 bg-white/30 p-6 shadow-2xl backdrop-blur-2xl pointer-events-auto"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">
                  {editingCourse ? "Edit Course" : "Add New Course"}
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-500 hover:bg-white/40 hover:text-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="title" className="mb-1 block text-sm font-semibold text-slate-700">
                    Course Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    defaultValue={editingCourse?.title || ""}
                    placeholder="e.g. Advanced React Patterns"
                    className="w-full rounded-xl border border-white/50 bg-white/40 px-4 py-2.5 text-slate-800 placeholder:text-slate-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 backdrop-blur-md transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="progress" className="mb-1 block text-sm font-semibold text-slate-700">
                    Progress (%)
                  </label>
                  <input
                    type="number"
                    id="progress"
                    name="progress"
                    min="0"
                    max="100"
                    required
                    defaultValue={editingCourse?.progress ?? 0}
                    className="w-full rounded-xl border border-white/50 bg-white/40 px-4 py-2.5 text-slate-800 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 backdrop-blur-md transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="icon_name" className="mb-1 block text-sm font-semibold text-slate-700">
                    Icon Name (Lucide)
                  </label>
                  <input
                    type="text"
                    id="icon_name"
                    name="icon_name"
                    required
                    defaultValue={editingCourse?.icon_name || "Book"}
                    placeholder="e.g. Code, Monitor, BookOpen"
                    className="w-full rounded-xl border border-white/50 bg-white/40 px-4 py-2.5 text-slate-800 placeholder:text-slate-500 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 backdrop-blur-md transition-all"
                  />
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-white/40 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-sky-400 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                    {isSubmitting ? "Saving..." : "Save Course"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
