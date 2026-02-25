"use client";

import { useEffect, useState, use } from "react";
import { API_URL } from "@/lib/config";

export default function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [name, setName] = useState("");
  const [items, setItems] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/skills/${id}`)
      .then((res) => res.json())
      .then((data) => { setName(data.name ?? ""); setItems((data.items ?? []).join(", ")); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/skills/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, items: items.split(",").map((s) => s.trim()).filter(Boolean) }),
      });
      if (!res.ok) throw new Error("Failed to update");
      window.location.href = "/admin/skills";
    } catch {
      alert("Error updating skill category");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold">Edit Skill Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Category Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Items (comma-separated)</label>
          <input value={items} onChange={(e) => setItems(e.target.value)} className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {saving ? "Saving..." : "Update"}
          </button>
          <a href="/admin/skills" className="rounded border border-border px-4 py-2 text-sm hover:bg-card">Cancel</a>
        </div>
      </form>
    </div>
  );
}
