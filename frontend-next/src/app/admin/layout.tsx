import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Korn Portfolio",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border/60 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <a href="/admin" className="text-lg font-bold text-primary">
            Admin Panel
          </a>
          <nav className="flex gap-4 text-sm">
            <a href="/admin/skills" className="hover:text-primary">Skills</a>
            <a href="/admin/projects" className="hover:text-primary">Projects</a>
            <a href="/admin/experience" className="hover:text-primary">Experience</a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
