"use client";

import { usePathname } from "next/navigation";
import AuthGuard from "@/components/admin/AuthGuard";

const navItems = [
  { label: "Projects", href: "/admin/projects" },
  { label: "Skills", href: "/admin/skills" },
  { label: "Experience", href: "/admin/experience" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  function handleLogout() {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  }

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return (
    <AuthGuard>
      <div className="min-h-screen flex bg-background">
        <aside className="w-64 border-r border-border bg-card p-6 flex flex-col">
          <div className="mb-8">
            <a href="/admin">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </a>
          </div>
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 rounded-lg transition-colors ${isActive ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors"
          >
            <span>Log Out</span>
          </button>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
