"use client";

import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Course } from "@/types/course";
import { Sidebar } from "./Sidebar";
import { BentoGrid } from "./BentoGrid";
import { CoursesView } from "./CoursesView";
import { AnalyticsView } from "./AnalyticsView";
import { SettingsView } from "./SettingsView";
import { BackgroundBlobs } from "./BackgroundBlobs";

export type ActiveView = "Home" | "Courses" | "Analytics" | "Settings";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 28 },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
};

export function DashboardShell({ courses }: { courses: Course[] }) {
  const [activeView, setActiveView] = useState<ActiveView>("Home");

  return (
    <div className="min-h-screen w-full relative">
      <BackgroundBlobs />
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <main className="pl-0 pb-24 md:pb-0 md:pl-20 xl:pl-64 min-h-screen">
        <div className="p-6 md:p-8 xl:p-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              variants={pageVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {activeView === "Home" && <BentoGrid courses={courses} />}
              {activeView === "Courses" && <CoursesView courses={courses} />}
              {activeView === "Analytics" && <AnalyticsView courses={courses} />}
              {activeView === "Settings" && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
