"use client";

import { useState } from "react";
import { API_URL } from "@/lib/config";

export default function NewSkillPage() {
  const [name, setName] = useState("");
  const [items, setItems] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, items: items.split(",").map((s) => s.trim()).filter(Boolean) }),
      });
      if (!res.ok) throw new Error("Failed to create");
      window.location.href = "/admin/skills";
    } catch {
      alert("Error creating skill category");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold">New Skill Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Category Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded border border-border bg-card px-3 py-2 text-foreground"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Items (comma-separated)</label>
          <input
            value={items}
            onChange={(e) => setItems(e.target.value)}
            placeholder="React, TypeScript, Go"
            className="w-full rounded border border-border bg-card px-3 py-2 text-foreground"
          />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {saving ? "Saving..." : "Create"}
          </button>
          <a href="/admin/skills" className="rounded border border-border px-4 py-2 text-sm hover:bg-card">Cancel</a>
        </div>
      </form>
    </div>
  );
}
