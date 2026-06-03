export default function Loading() {
  const skeletons = Array.from({ length: 6 });

  return (
    <main className="min-h-screen bg-black pl-0 md:pl-20 xl:pl-64 text-white pb-24 md:pb-0">
      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="col-span-1 h-48 animate-pulse rounded-3xl bg-zinc-900 md:col-span-2 xl:col-span-2" />
          <div className="col-span-1 h-48 animate-pulse rounded-3xl bg-zinc-900 xl:col-span-2" />
          {skeletons.map((_, i) => (
            <div key={i} className="col-span-1 h-64 animate-pulse rounded-3xl bg-zinc-900" />
          ))}
        </div>
      </div>
    </main>
  );
}
