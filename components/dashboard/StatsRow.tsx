"use client";

import { motion, Variants } from "framer-motion";
import { BookOpen, TrendingUp, Flame, Clock } from "lucide-react";
import { Course } from "@/types/course";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBg: string;
  delay?: number;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

function StatCard({ icon, label, value, iconBg }: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center gap-4 rounded-3xl border border-white/30 bg-white/20 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg} shadow-inner`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </motion.div>
  );
}

export function StatsRow({ courses }: { courses: Course[] }) {
  const totalCourses = courses.length;
  const avgProgress =
    totalCourses > 0
      ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / totalCourses)
      : 0;

  const stats = [
    {
      icon: <BookOpen size={22} className="text-pink-500" />,
      label: "Total Courses",
      value: totalCourses,
      iconBg: "bg-pink-500/10",
    },
    {
      icon: <TrendingUp size={22} className="text-sky-500" />,
      label: "Avg Progress",
      value: `${avgProgress}%`,
      iconBg: "bg-sky-500/10",
    },
    {
      icon: <Flame size={22} className="text-blue-500" />,
      label: "Learning Streak",
      value: "12 Days",
      iconBg: "bg-blue-500/10",
    },
    {
      icon: <Clock size={22} className="text-pink-400" />,
      label: "Hours Learned",
      value: "48 hrs",
      iconBg: "bg-pink-400/10",
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </>
  );
}
