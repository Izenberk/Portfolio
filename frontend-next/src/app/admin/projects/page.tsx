"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";

interface Project {
  id: string;
  title: string;
  description: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading projects...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <a href="/admin/projects/new" className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          New Project
        </a>
      </div>
      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects found.</p>
      ) : (
        <ul className="space-y-3">
          {projects.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded border border-border bg-card px-4 py-3">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">{p.description}</p>
              </div>
              <a href={`/admin/projects/${p.id}`} className="text-sm text-primary hover:underline">Edit</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
