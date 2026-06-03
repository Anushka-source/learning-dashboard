"use client";

import { Course } from "@/types/course";
import { motion, Variants } from "framer-motion";
import { HeroTile } from "./HeroTile";
import { ActivityTile } from "./ActivityTile";
import { CourseCard } from "./CourseCard";
import { StatsRow } from "./StatsRow";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function BentoGrid({ courses }: { courses: Course[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      {/* Top row: Hero + Activity */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <HeroTile />
        <ActivityTile />
      </section>

      {/* Stats row */}
      <section
        aria-label="Statistics"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatsRow courses={courses} />
      </section>

      {/* Course cards */}
      {courses.length > 0 && (
        <section aria-label="Courses">
          <h2 className="mb-4 text-xl font-bold text-slate-700">My Courses</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      )}

      {courses.length === 0 && (
        <motion.div
          variants={containerVariants}
          className="rounded-3xl border border-white/30 bg-white/20 p-12 text-center shadow-xl backdrop-blur-xl"
        >
          <p className="text-lg font-semibold text-slate-600">
            No courses found yet.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Add some courses to your Supabase table to get started.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
