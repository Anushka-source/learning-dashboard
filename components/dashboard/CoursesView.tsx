"use client";

import { Course } from "@/types/course";
import { motion, Variants } from "framer-motion";
import { CourseCard } from "./CourseCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

export function CoursesView({ courses }: { courses: Course[] }) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Courses</h1>
        <p className="mt-1 text-slate-500">
          {courses.length} course{courses.length !== 1 ? "s" : ""} enrolled
        </p>
      </motion.div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-white/30 bg-white/20 p-12 text-center shadow-xl backdrop-blur-xl"
        >
          <p className="text-lg font-semibold text-slate-600">No courses yet.</p>
          <p className="mt-2 text-sm text-slate-400">
            Add some courses to your Supabase table to see them here.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
