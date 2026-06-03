export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      {/* Fixed background blobs — static, no JS needed */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-300/50 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[450px] w-[450px] rounded-full bg-blue-300/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-pink-300/40 blur-3xl" />
      </div>

      {/* Sidebar skeleton — desktop only */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col border-r border-white/30 bg-white/15 p-4 shadow-2xl backdrop-blur-xl md:flex xl:w-64">
        {/* Logo */}
        <div className="mb-10 mt-4 flex items-center justify-center xl:justify-start xl:px-4">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-white/40" />
          <div className="ml-3 hidden h-5 w-20 animate-pulse rounded-lg bg-white/30 xl:block" />
        </div>
        {/* Nav items */}
        <ul className="flex flex-col gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="flex items-center gap-4 rounded-xl px-4 py-3 md:justify-center xl:justify-start">
              <div className="h-6 w-6 shrink-0 animate-pulse rounded-lg bg-white/35" />
              <div className="hidden h-4 w-20 animate-pulse rounded-md bg-white/25 xl:block" />
            </li>
          ))}
        </ul>
        {/* Footer hint */}
        <div className="mt-auto hidden xl:block px-4 pb-4">
          <div className="h-20 w-full animate-pulse rounded-2xl bg-white/30" />
        </div>
      </aside>

      {/* Mobile bottom nav skeleton */}
      <div className="fixed bottom-0 z-50 w-full border-t border-white/30 bg-white/20 p-2 shadow-2xl backdrop-blur-xl md:hidden">
        <div className="flex justify-around">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 px-4 py-2">
              <div className="h-5 w-5 animate-pulse rounded-md bg-white/50" />
              <div className="h-2.5 w-8 animate-pulse rounded-sm bg-white/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="pl-0 pb-24 md:pb-0 md:pl-20 xl:pl-64">
        <div className="p-6 md:p-8 xl:p-10 flex flex-col gap-8">

          {/* ── Hero + Activity row ── */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

            {/* Hero skeleton */}
            <div className="col-span-1 md:col-span-2 xl:col-span-2 relative overflow-hidden rounded-3xl border border-white/30 bg-white/20 p-8 shadow-xl backdrop-blur-xl animate-pulse">
              {/* Decorative circles */}
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-200/30" />
              <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-purple-200/30" />
              {/* Streak badge */}
              <div className="mb-4 h-7 w-44 rounded-full bg-white/40" />
              {/* Title lines */}
              <div className="h-9 w-3/4 rounded-xl bg-white/40 mb-3" />
              <div className="h-9 w-1/2 rounded-xl bg-white/35 mb-4" />
              {/* Subtitle */}
              <div className="h-4 w-2/3 rounded-lg bg-white/30" />
            </div>

            {/* Activity tile skeleton */}
            <div className="col-span-1 xl:col-span-2 flex flex-col justify-between rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-xl animate-pulse">
              <div>
                <div className="mb-2 h-6 w-24 rounded-lg bg-white/40" />
                <div className="mb-5 h-3.5 w-48 rounded-md bg-white/30" />
                {/* Day labels */}
                <div className="grid grid-cols-7 gap-2 mb-1.5">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-3 rounded bg-white/30" />
                  ))}
                </div>
              </div>
              {/* Heatmap grid */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-lg bg-white/30" />
                ))}
              </div>
            </div>
          </div>

          {/* ── Stats cards row ── */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-3xl border border-white/30 bg-white/20 p-5 shadow-xl backdrop-blur-xl animate-pulse"
              >
                {/* Icon */}
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-white/40" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-3.5 w-20 rounded-md bg-white/35" />
                  <div className="h-7 w-14 rounded-lg bg-white/45" />
                  <div className="h-3 w-16 rounded-sm bg-white/25" />
                </div>
              </div>
            ))}
          </div>

          {/* ── Section heading ── */}
          <div className="h-7 w-36 animate-pulse rounded-xl bg-white/35" />

          {/* ── Course card skeletons ── */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-xl animate-pulse"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Header row: icon + badge */}
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-white/40" />
                  <div className="h-6 w-20 rounded-full bg-white/35" />
                </div>

                {/* Body */}
                <div className="mt-6">
                  {/* Title */}
                  <div className="h-5 w-4/5 rounded-lg bg-white/40 mb-2" />
                  <div className="h-5 w-3/5 rounded-lg bg-white/30" />

                  {/* Label row */}
                  <div className="mt-5 flex items-center justify-between">
                    <div className="h-3 w-20 rounded-md bg-white/30" />
                    <div className="h-4 w-10 rounded-md bg-white/40" />
                  </div>

                  {/* Progress track */}
                  <div className="mt-2 h-2.5 w-full rounded-full bg-white/35" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
