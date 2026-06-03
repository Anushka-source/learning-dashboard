"use client";

import { Course } from "@/types/course";
import { motion, Variants } from "framer-motion";
import { HeroTile } from "./HeroTile";
import { ActivityTile } from "./ActivityTile";
import { CourseCard } from "./CourseCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function BentoGrid({ courses }: { courses: Course[] }) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
    >
      <HeroTile />
      <ActivityTile />
      
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </motion.section>
  );
}
