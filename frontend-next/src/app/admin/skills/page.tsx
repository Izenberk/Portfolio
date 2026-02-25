"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";

interface SkillCategory {
  id: string;
  name: string;
  items: string[];
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading skills...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Skill Categories</h1>
        <a href="/admin/skills/new" className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          New Category
        </a>
      </div>
      {skills.length === 0 ? (
        <p className="text-muted-foreground">No skill categories found.</p>
      ) : (
        <ul className="space-y-3">
          {skills.map((cat) => (
            <li key={cat.id} className="flex items-center justify-between rounded border border-border bg-card px-4 py-3">
              <div>
                <p className="font-medium">{cat.name}</p>
                <p className="text-sm text-muted-foreground">{cat.items?.length ?? 0} items</p>
              </div>
              <a href={`/admin/skills/${cat.id}`} className="text-sm text-primary hover:underline">
                Edit
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
