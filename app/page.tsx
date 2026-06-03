import { createSupabaseServerClient } from "@/lib/supabase";

export default async function Home() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.from("courses").select("*");

  if (error) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        Error fetching data
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-4xl font-bold">Learning Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {data.map((course) => (
          <article
            key={course.id}
            className="rounded-3xl border border-white/10 bg-zinc-900 p-6"
          >
            <h2 className="text-xl font-semibold">{course.title}</h2>

            <p className="mt-4 text-zinc-400">
              Progress: {course.progress}%
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
