import { createSupabaseServerClient } from "@/lib/supabase";
import { Course } from "@/types/course";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function Home() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-black pl-0 md:pl-20 xl:pl-64 text-white pb-24 md:pb-0">
        <Sidebar />
        <div className="p-6 md:p-10 flex h-[80vh] items-center justify-center">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center max-w-md">
            <h1 className="text-2xl font-bold text-red-400">Error fetching data</h1>
            <p className="mt-4 text-red-200/80">
              Please check your Supabase URL, publishable key, table name, and RLS policies.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const courses = data as Course[];

  return (
    <main className="min-h-screen bg-black text-white pb-24 md:pb-0">
      <Sidebar />
      <div className="pl-0 md:pl-20 xl:pl-64">
        <div className="p-6 md:p-10">
          <BentoGrid courses={courses} />
        </div>
      </div>
    </main>
  );
}
