"use client";

import { useEffect, useState, use } from "react";
import { API_URL } from "@/lib/config";

export default function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/experience/${id}`)
      .then((res) => res.json())
      .then((data) => { setCompany(data.company ?? ""); setRole(data.role ?? ""); setStartDate(data.startDate ?? ""); setEndDate(data.endDate ?? ""); setDescription(data.description ?? ""); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/experience/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, role, startDate, endDate: endDate || undefined, description }),
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
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold">Edit Experience</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Company</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} required className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Role</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} required className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Start Date</label>
            <input value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">End Date</label>
            <input value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="Present" className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted-foreground">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded border border-border bg-card px-3 py-2 text-foreground" />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {saving ? "Saving..." : "Update"}
          </button>
          <a href="/admin/experience" className="rounded border border-border px-4 py-2 text-sm hover:bg-card">Cancel</a>
        </div>
      </form>
    </div>
  );
}
