"use client";

import { Course } from "@/types/course";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { CourseCard } from "./CourseCard";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CourseModal } from "./CourseModal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

export function CoursesView({ courses }: { courses: Course[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const showToast = (text: string, type: "success" | "error") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Courses</h1>
          <p className="mt-1 text-slate-500">
            {courses.length} course{courses.length !== 1 ? "s" : ""} enrolled
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-sky-400 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          <Plus size={18} /> Add Course
        </button>
      </motion.div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={() => handleOpenEdit(course)}
              onSuccess={(msg) => showToast(msg, "success")}
              onError={(msg) => showToast(msg, "error")}
            />
          ))}
        </div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-white/30 bg-white/20 backdrop-blur-xl p-12 text-center shadow-xl"
        >
          <p className="text-lg font-semibold text-slate-800">No courses yet.</p>
          <p className="mt-2 text-sm text-slate-500">
            Add some courses to your Supabase table to see them here.
          </p>
        </motion.div>
      )}

      {/* Course Modal */}
      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingCourse={editingCourse}
        onSuccess={(msg) => showToast(msg, "success")}
        onError={(msg) => showToast(msg, "error")}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-[200] rounded-2xl px-6 py-3 font-semibold shadow-2xl backdrop-blur-xl ${
              toastMessage.type === "success"
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {toastMessage.text}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
