"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
}

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/experience`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading experience...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Experience</h1>
        <a href="/admin/experience/new" className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          New Experience
        </a>
      </div>
      {items.length === 0 ? (
        <p className="text-muted-foreground">No experience items found.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((exp) => (
            <li key={exp.id} className="flex items-center justify-between rounded border border-border bg-card px-4 py-3">
              <div>
                <p className="font-medium">{exp.role}</p>
                <p className="text-sm text-muted-foreground">{exp.company} &middot; {exp.startDate}{exp.endDate ? ` - ${exp.endDate}` : " - Present"}</p>
              </div>
              <a href={`/admin/experience/${exp.id}`} className="text-sm text-primary hover:underline">Edit</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
