"use client";

import { useState } from "react";
import { API_URL } from "@/lib/config";

export default function NewProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [github, setGithub] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, tech: tech.split(",").map((s) => s.trim()).filter(Boolean), github }),
      });
      if (!res.ok) throw new Error("Failed to create");
      window.location.href = "/admin/projects";
    } catch {
      alert("Error creating project");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold">New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Tech Stack (comma-separated)</label>
          <input value={tech} onChange={(e) => setTech(e.target.value)} placeholder="React, Go, MongoDB" className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">GitHub URL</label>
          <input value={github} onChange={(e) => setGithub(e.target.value)} type="url" className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {saving ? "Saving..." : "Create"}
          </button>
          <a href="/admin/projects" className="rounded border border-border px-4 py-2 text-sm hover:bg-card">Cancel</a>
        </div>
      </form>
    </div>
  );
}
