"use client";

import { useEffect, useState, use } from "react";
import { API_URL } from "@/lib/config";
import { Plus, X } from "lucide-react";

export default function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState<string[]>([]);
  const [descInput, setDescInput] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/experience`)
      .then((res) => res.json())
      .then((data) => {
        const item = (data ?? []).find((e: { _id: string }) => e._id === id);
        if (item) {
          setRole(item.role ?? "");
          setCompany(item.company ?? "");
          setUrl(item.url ?? "");
          setLocation(item.location ?? "");
          setStart(item.start ?? "");
          setEnd(item.end ?? "");
          setDescription(item.description ?? []);
          setTags((item.tags ?? []).join(", "));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  function addDesc() {
    const trimmed = descInput.trim();
    if (!trimmed) return;
    setDescription((prev) => [...prev, trimmed]);
    setDescInput("");
  }

  function removeDesc(index: number) {
    setDescription((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_URL}/experience/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role,
          company,
          url: url || undefined,
          location: location || undefined,
          start,
          end: end || undefined,
          description,
          tags: tags.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
      window.location.href = "/admin/experience";
    } catch {
      alert("Error updating experience");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8 shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Edit Experience</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Role / Position</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} required type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} required type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company URL</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" placeholder="https://company.com" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Bangkok, Thailand" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input value={start} onChange={(e) => setStart(e.target.value)} required type="text" placeholder="Jan 2024" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input value={end} onChange={(e) => setEnd(e.target.value)} type="text" placeholder="Present" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium">Description / Highlights</label>
          <div className="flex gap-2">
            <input
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addDesc(); } }}
              placeholder="Add a responsibility or achievement..."
              type="text"
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button type="button" onClick={addDesc} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          {description.length > 0 && (
            <ul className="space-y-2">
              {description.map((desc, i) => (
                <li key={i} className="group flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                  <span className="flex-1 text-sm leading-relaxed break-words">{desc}</span>
                  <button type="button" onClick={() => removeDesc(i)} className="text-muted-foreground hover:text-destructive transition opacity-0 group-hover:opacity-100 p-1" aria-label="Remove item">
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags (Comma separated)</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="React, TypeScript, Go" type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
        </div>

        <div className="pt-4 flex gap-4">
          <button type="submit" disabled={saving} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50">
            {saving ? "Saving..." : "Update Experience"}
          </button>
          <a href="/admin/experience" className="px-6 py-2 border border-border rounded-lg font-medium hover:bg-muted transition">Cancel</a>
        </div>
      </form>
    </div>
  );
}
