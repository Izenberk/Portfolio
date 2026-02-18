'use client';

import { useState } from 'react';

import { API_URL } from '@/lib/config';

export default function NewExperiencePage() {
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        url: '',
        start: '',
        end: '',
        location: '',
    });
    const [description, setDescription] = useState(['']);
    const [tags, setTags] = useState(['']);

    const addBullet = () => {
        setDescription([...description, '']);
    };

    const removeBullet = (index: number) => {
        setDescription(description.filter((_, i) => i !== index));
    };

    const updateBullet = (index: number, value: string) => {
        const newDesc = [...description];
        newDesc[index] = value;
        setDescription(newDesc);
    };

    const addTag = () => {
        setTags([...tags, '']);
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const updateTag = (index: number, value: string) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Filter out empty bullets
        const cleanDescription = description.filter(d => d.trim() !== '');
        const cleanTags = tags.filter(t => t.trim() !== '');

        const res = await fetch(`${API_URL}/api/experience`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...formData,
                description: cleanDescription,
                tags: cleanTags,
                // Send null if end date is empty (Current job)
                end: formData.end || null,
            }),
        });

        if (res.ok) {
            window.location.href = '/admin/experience';
        } else {
            alert('Failed to create experience entry');
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-6">Add Experience</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Company</label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Role</label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Company Website (Optional)</label>
                        <input
                            type="url"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            placeholder="https://example.com"
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input
                                type="date"
                                value={formData.start}
                                onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">End Date <span className="text-muted-foreground font-normal">(Leave empty for Present)</span></label>
                            <input
                                type="date"
                                value={formData.end}
                                onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. Bangkok, TH"
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium">Key Achievements (Bullets)</label>
                            <button
                                type="button"
                                onClick={addBullet}
                                className="text-sm text-primary hover:underline"
                            >
                                + Add Bullet
                            </button>
                        </div>

                        <div className="space-y-2">
                            {description.map((desc, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={desc}
                                        onChange={(e) => updateBullet(index, e.target.value)}
                                        placeholder="e.g. Led a team of 5 developers..."
                                        className="flex-1 px-3 py-2 rounded-lg border border-border bg-background"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeBullet(index)}
                                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        disabled={description.length === 1}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium">Tags / Skills</label>
                            <button
                                type="button"
                                onClick={addTag}
                                className="text-sm text-primary hover:underline"
                            >
                                + Add Tag
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <div key={index} className="flex items-center gap-1">
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={(e) => updateTag(index, e.target.value)}
                                        placeholder="Tag"
                                        className="w-32 px-2 py-1 rounded-lg border border-border bg-background text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="text-red-500 hover:text-red-700"
                                        disabled={tags.length === 1}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
                        >
                            Add Experience
                        </button>
                        <a
                            href="/admin/experience"
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
