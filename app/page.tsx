import { createSupabaseServerClient } from "@/lib/supabase";
import { Course } from "@/types/course";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function Home() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 flex items-center justify-center p-6">
        <div className="max-w-md rounded-3xl border border-red-200/50 bg-white/30 p-8 text-center shadow-xl backdrop-blur-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100/70">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-red-600">Connection Error</h1>
          <p className="mt-3 text-sm text-slate-600">
            Please check your Supabase URL, anon key, table name, and RLS policies.
          </p>
        </div>
      </div>
    );
  }

  const courses = data as Course[];

  return <DashboardShell courses={courses} />;
}
