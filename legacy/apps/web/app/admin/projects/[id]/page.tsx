'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DynamicListInput from "@/components/admin/DynamicListInput";

import { API_URL } from '@/lib/config';

export default function EditProjectPage() {
  const params = useParams();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    image: '',
    demoLink: '',
    repoLink: '',
    details: [] as string[], // Changed to array
    stack: '',   // New: comma separated
    contributors: '', // New
  });

  // Fetch existing data
  useEffect(() => {
    fetch(`${API_URL}/api/projects/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title,
          slug: data.slug,
          summary: data.summary,
          image: data.image,
          demoLink: data.links?.demo || '',
          repoLink: data.links?.repo || '',
          details: data.details || [], // Keep as array
          stack: data.stack?.join(', ') || '',
          contributors: data.contributors || '',
        });
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      ...formData,
      links: { demo: formData.demoLink, repo: formData.repoLink },
      // details is already an array
      stack: formData.stack.split(',').map(s => s.trim()).filter(s => s !== ''),
    };

    const res = await fetch(`${API_URL}/api/projects/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      window.location.href = '/admin/projects';
    } else {
      alert('Failed to update project');
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug (URL)</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Summary</label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background h-24"
              required
            />
          </div>

          <DynamicListInput
            label="Details / Features"
            placeholder="Add a key feature..."
            value={formData.details}
            onChange={(newDetails) => setFormData({ ...formData, details: newDetails })}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Tech Stack (Comma separated)</label>
            <input
              type="text"
              value={formData.stack}
              onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              placeholder="React, Next.js, TypeScript"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contributors (e.g. "Solo", "Team")</label>
            <input
              type="text"
              value={formData.contributors}
              onChange={(e) => setFormData({ ...formData, contributors: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Demo Link</label>
              <input
                type="text"
                value={formData.demoLink}
                onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Repo Link</label>
              <input
                type="text"
                value={formData.repoLink}
                onChange={(e) => setFormData({ ...formData, repoLink: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
            >
              Update Project
            </button>
            <a
              href="/admin/projects"
              className="px-6 py-2 border border-border rounded-lg font-medium hover:bg-muted transition"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}