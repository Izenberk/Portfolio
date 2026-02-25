"use client";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Welcome to Admin Panel</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <a
          href="/admin/projects"
          className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-primary/5 shadow-sm"
        >
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage portfolio projects</p>
        </a>
        <a
          href="/admin/skills"
          className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-primary/5 shadow-sm"
        >
          <h2 className="text-lg font-semibold">Skills</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage skill categories and items</p>
        </a>
        <a
          href="/admin/experience"
          className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-primary/5 shadow-sm"
        >
          <h2 className="text-lg font-semibold">Experience</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage work experience entries</p>
        </a>
      </div>
    </div>
  );
}
