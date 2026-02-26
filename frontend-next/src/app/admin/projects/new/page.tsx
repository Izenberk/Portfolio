"use client";

import { useState } from "react";
import { API_URL } from "@/lib/config";
import { Plus, X } from "lucide-react";

export default function NewProjectPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState<string[]>([]);
  const [detailInput, setDetailInput] = useState("");
  const [stack, setStack] = useState("");
  const [contributors, setContributors] = useState("");
  const [image, setImage] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [saving, setSaving] = useState(false);

  function addDetail() {
    const trimmed = detailInput.trim();
    if (!trimmed) return;
    setDetails((prev) => [...prev, trimmed]);
    setDetailInput("");
  }

  function removeDetail(index: number) {
    setDetails((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          slug,
          summary,
          details,
          stack: stack.split(",").map((s) => s.trim()).filter(Boolean),
          contributors,
          image,
          links: { demo: demoLink || undefined, repo: repoLink || undefined },
        }),
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
    <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8 shadow-sm">
      <h1 className="text-2xl font-bold mb-6">New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug (URL)</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} required type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Summary</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-border bg-background h-24" />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium">Details / Features</label>
          <div className="flex gap-2">
            <input
              value={detailInput}
              onChange={(e) => setDetailInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addDetail(); } }}
              placeholder="Add a key feature..."
              type="text"
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button type="button" onClick={addDetail} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          {details.length > 0 && (
            <ul className="space-y-2">
              {details.map((detail, i) => (
                <li key={i} className="group flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                  <span className="flex-1 text-sm leading-relaxed break-words">{detail}</span>
                  <button type="button" onClick={() => removeDetail(i)} className="text-muted-foreground hover:text-destructive transition opacity-0 group-hover:opacity-100 p-1" aria-label="Remove item">
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tech Stack (Comma separated)</label>
          <input value={stack} onChange={(e) => setStack(e.target.value)} placeholder="React, Next.js, TypeScript" type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contributors (e.g. &quot;Solo&quot;, &quot;Team&quot;)</label>
          <input value={contributors} onChange={(e) => setContributors(e.target.value)} type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Demo Link</label>
            <input value={demoLink} onChange={(e) => setDemoLink(e.target.value)} type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Repo Link</label>
            <input value={repoLink} onChange={(e) => setRepoLink(e.target.value)} type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
          </div>
        </div>
        <div className="pt-4 flex gap-4">
          <button type="submit" disabled={saving} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50">
            {saving ? "Saving..." : "Create Project"}
          </button>
          <a href="/admin/projects" className="px-6 py-2 border border-border rounded-lg font-medium hover:bg-muted transition">Cancel</a>
        </div>
      </form>
    </div>
  );
}
