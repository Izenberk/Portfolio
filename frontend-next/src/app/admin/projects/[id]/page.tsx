"use client";

import { useEffect, useState, use } from "react";
import { API_URL } from "@/lib/config";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [github, setGithub] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/projects/${id}`)
      .then((res) => res.json())
      .then((data) => { setTitle(data.title ?? ""); setDescription(data.description ?? ""); setTech((data.tech ?? []).join(", ")); setGithub(data.github ?? ""); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, tech: tech.split(",").map((s) => s.trim()).filter(Boolean), github }),
      });
      if (!res.ok) throw new Error("Failed to update");
      window.location.href = "/admin/projects";
    } catch {
      alert("Error updating project");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold">Edit Project</h1>
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
          <input value={tech} onChange={(e) => setTech(e.target.value)} className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">GitHub URL</label>
          <input value={github} onChange={(e) => setGithub(e.target.value)} type="url" className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {saving ? "Saving..." : "Update"}
          </button>
          <a href="/admin/projects" className="rounded border border-border px-4 py-2 text-sm hover:bg-card">Cancel</a>
        </div>
      </form>
    </div>
  );
}
