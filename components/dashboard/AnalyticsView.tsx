"use client";

import { Course } from "@/types/course";
import { motion, Variants } from "framer-motion";
import { BookOpen, TrendingUp, Flame, Clock, Award } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

/* ─── Motion variants ─────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

/* ─── Stat card ───────────────────────────────────────────────── */
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBg: string;
  sub?: string;
}

function StatCard({ icon, label, value, iconBg, sub }: StatCardProps) {
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
        {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
      </div>
    </motion.div>
  );
}

/* ─── Custom tooltip shared style ────────────────────────────── */
interface TooltipEntry {
  active?: boolean;
  payload?: { name?: string; value?: number; color?: string }[];
  label?: string;
}

function GlassTooltip({ active, payload, label }: TooltipEntry) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/30 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-xl">
      {label && <p className="mb-1 text-xs font-semibold text-slate-500">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-bold" style={{ color: p.color ?? "#6366f1" }}>
          {p.name}: {p.value}
          {p.name === "Progress" ? "%" : p.name === "Minutes" ? " min" : ""}
        </p>
      ))}
    </div>
  );
}

/* ─── Weekly trend mock data ──────────────────────────────────── */
const weeklyData = [
  { day: "Mon", Minutes: 45 },
  { day: "Tue", Minutes: 80 },
  { day: "Wed", Minutes: 30 },
  { day: "Thu", Minutes: 90 },
  { day: "Fri", Minutes: 60 },
  { day: "Sat", Minutes: 120 },
  { day: "Sun", Minutes: 75 },
];

/* ─── Pie colours ─────────────────────────────────────────────── */
const PIE_COLORS = ["#94a3b8", "#6366f1", "#10b981"];

/* ─── Main component ──────────────────────────────────────────── */
export function AnalyticsView({ courses }: { courses: Course[] }) {
  const totalCourses = courses.length;
  const avgProgress =
    totalCourses > 0
      ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / totalCourses)
      : 0;
  const completed = courses.filter((c) => c.progress === 100).length;
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100).length;
  const notStarted = courses.filter((c) => c.progress === 0).length;

  /* Bar chart data — truncate long titles */
  const barData = courses.map((c) => ({
    name: c.title.length > 14 ? c.title.slice(0, 14) + "…" : c.title,
    Progress: c.progress,
  }));

  /* Pie data */
  const pieData = [
    { name: "Not Started", value: notStarted },
    { name: "In Progress", value: inProgress },
    { name: "Completed", value: completed },
  ].filter((d) => d.value > 0);

  const stats = [
    {
      icon: <BookOpen size={22} className="text-indigo-600" />,
      label: "Total Courses",
      value: totalCourses,
      iconBg: "bg-indigo-100/70",
      sub: `${completed} completed`,
    },
    {
      icon: <TrendingUp size={22} className="text-violet-600" />,
      label: "Avg Progress",
      value: `${avgProgress}%`,
      iconBg: "bg-violet-100/70",
      sub: `${inProgress} in progress`,
    },
    {
      icon: <Flame size={22} className="text-orange-500" />,
      label: "Learning Streak",
      value: "12 Days",
      iconBg: "bg-orange-100/70",
      sub: "Personal best!",
    },
    {
      icon: <Clock size={22} className="text-pink-600" />,
      label: "Hours Learned",
      value: "48 hrs",
      iconBg: "bg-pink-100/70",
      sub: "This month",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8"
    >
      {/* ── Header ── */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-slate-800">Analytics</h1>
        <p className="mt-1 text-slate-500">Your learning insights at a glance</p>
      </motion.div>

      {/* ── Stat cards ── */}
      <section
        aria-label="Statistics"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* ── Bar Chart: Course Progress ── */}
        <motion.section
          variants={itemVariants}
          aria-label="Course progress chart"
          className="rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100/70">
              <Award size={18} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Course Progress</h2>
              <p className="text-xs text-slate-400">Completion % per course</p>
            </div>
          </div>

          {courses.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData} barCategoryGap="30%" margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" strokeOpacity={0.4} vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#64748b", fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<GlassTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
                <Bar dataKey="Progress" fill="url(#barGrad)" radius={[8, 8, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="py-16 text-center text-sm text-slate-400">No course data yet.</p>
          )}
        </motion.section>

        {/* ── Pie Chart: Completion Distribution ── */}
        <motion.section
          variants={itemVariants}
          aria-label="Completion distribution chart"
          className="rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100/70">
              <TrendingUp size={18} className="text-violet-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Completion Distribution</h2>
              <p className="text-xs text-slate-400">Not started · In progress · Done</p>
            </div>
          </div>

          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <defs>
                  {PIE_COLORS.map((color, i) => (
                    <linearGradient key={i} id={`pieGrad${i}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={`url(#pieGrad${index})`} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="rounded-2xl border border-white/30 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-xl">
                        <p className="text-sm font-bold text-slate-700">
                          {payload[0].name}: {payload[0].value}
                        </p>
                      </div>
                    );
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={10}
                  formatter={(value) => (
                    <span className="text-xs font-medium text-slate-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="py-16 text-center text-sm text-slate-400">No data available.</p>
          )}
        </motion.section>
      </div>

      {/* ── Line / Area Chart: Weekly Trend ── */}
      <motion.section
        variants={itemVariants}
        aria-label="Weekly learning trend chart"
        className="rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-xl"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100/70">
            <Flame size={18} className="text-pink-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Weekly Learning Trend</h2>
            <p className="text-xs text-slate-400">Minutes spent learning each day this week</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={weeklyData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" strokeOpacity={0.4} vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#64748b", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}m`}
            />
            <Tooltip content={<GlassTooltip />} cursor={{ stroke: "#6366f1", strokeWidth: 1, strokeDasharray: "4 2" }} />
            <Area
              type="monotone"
              dataKey="Minutes"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#areaGrad)"
              dot={{ fill: "#6366f1", r: 4, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#7c3aed", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.section>

      {/* ── Per-course progress list ── */}
      {courses.length > 0 && (
        <motion.section
          variants={itemVariants}
          aria-label="Progress breakdown"
          className="rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100/70">
              <BookOpen size={18} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Progress Breakdown</h2>
              <p className="text-xs text-slate-400">Detailed view per course</p>
            </div>
          </div>
          <ul className="flex flex-col gap-5">
            {courses.map((course) => (
              <li key={course.id}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">{course.title}</span>
                  <span className="text-sm font-bold text-indigo-600">{course.progress}%</span>
                </div>
                <ProgressBar progress={course.progress} />
              </li>
            ))}
          </ul>
        </motion.section>
      )}
    </motion.div>
  );
}
