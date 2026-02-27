"use client";

/* ── shared shimmer block ─────────────────────────────────── */
function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-white/10 ${className ?? ""}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}

/* ── Skills skeleton ──────────────────────────────────────── */
function SkillsSkeleton() {
  return (
    <div className="py-16 md:py-24 animate-[fadeUp_0.5s_ease-out_forwards]">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Shimmer className="h-8 w-32" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/80 bg-card/50 p-5"
            >
              <Shimmer className="mb-4 h-6 w-40" />
              <div className="flex flex-col gap-4">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-4">
                    <Shimmer className="h-11 w-11 rounded-lg shrink-0" />
                    <Shimmer className="h-4 w-full max-w-[160px]" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Projects skeleton ────────────────────────────────────── */
function ProjectsSkeleton() {
  return (
    <div className="py-16 md:py-24 animate-[fadeUp_0.5s_ease-out_0.18s_both]">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Shimmer className="h-8 w-36" />
        <div className="mt-10 grid gap-10 grid-cols-1 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-muted/50 bg-card overflow-hidden"
            >
              <Shimmer className="aspect-[16/9] w-full rounded-none" />
              <div className="p-5 md:p-6 space-y-3">
                <Shimmer className="h-5 w-3/5" />
                <Shimmer className="h-3 w-4/5" />
                <div className="flex gap-2 pt-1">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Shimmer key={j} className="h-5 w-14 rounded-full" />
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Shimmer className="h-9 w-28 rounded-md" />
                  <Shimmer className="h-9 w-20 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Experience skeleton ──────────────────────────────────── */
function ExperienceSkeleton() {
  return (
    <div className="py-16 animate-[fadeUp_0.5s_ease-out_0.36s_both]">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Shimmer className="h-8 w-44 mb-3" />
        <Shimmer className="h-4 w-72 mb-10" />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-3 top-0 h-full w-px bg-white/10 md:left-1/2" />

          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="relative md:grid md:grid-cols-2 md:gap-8"
              >
                <span
                  className="absolute left-3 top-2 block h-3 w-3 -translate-x-1/2 rounded-full bg-primary/40 md:left-1/2"
                  aria-hidden
                />
                <div className={i % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}>
                  <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                    <Shimmer className="h-5 w-48" />
                    <Shimmer className="h-4 w-32" />
                    <Shimmer className="h-3 w-44" />
                    <div className="space-y-2 pt-1">
                      <Shimmer className="h-3 w-full" />
                      <Shimmer className="h-3 w-5/6" />
                    </div>
                    <div className="flex gap-2 pt-1">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <Shimmer key={j} className="h-5 w-16 rounded-xl" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Combined export ──────────────────────────────────────── */
export default function SectionSkeletons() {
  return (
    <div aria-busy="true" aria-label="Loading content">
      <SkillsSkeleton />
      <ProjectsSkeleton />
      <ExperienceSkeleton />
    </div>
  );
}
