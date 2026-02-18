'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableSkillItem } from '../_components/SortableSkillItem';

import { API_URL } from '@/lib/config';

export default function EditSkillPage() {
    const params = useParams();
    const [title, setTitle] = useState('');
    const [items, setItems] = useState<any[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        fetch(`${API_URL}/api/skills/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title);
                // Ensure items have an id for dnd-kit. DB usually provides _id, but we map it to id for consistency
                const mappedItems = data.items.map((item: any) => ({
                    ...item,
                    id: item._id || item.id || `fetched-${Math.random().toString(36).substr(2, 9)}`
                }));
                setItems(mappedItems);
            });
    }, [params.id]);

    const addItem = () => {
        setItems([
            ...items,
            {
                id: `new-${Date.now()}`,
                name: '',
                level: 'Intermediate',
                icon: '',
                description: ''
            }
        ]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: string, value: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Clean up IDs that are not _id (newly generated ones) if needed, 
        // but usually it's fine to send them back, backend might ignore or we can strip them.
        // For existing items, we want to keep _id if the backend uses it to update subdocs.
        // If we are replacing the whole array, we might not need to worry too much.

        const res = await fetch(`${API_URL}/api/skills/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, items }),
        });

        if (res.ok) {
            window.location.href = '/admin/skills';
        } else {
            alert('Failed to update skill category');
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-6">Edit Skill Category</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Category Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Frontend, Backend, Tools"
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium">Skills</label>
                            <button
                                type="button"
                                onClick={addItem}
                                className="text-sm text-primary hover:underline"
                            >
                                + Add Item
                            </button>
                        </div>

                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={items.map(i => i.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-4">
                                    {items.map((item, index) => (
                                        <SortableSkillItem
                                            key={item.id}
                                            id={item.id}
                                            index={index}
                                            item={item}
                                            updateItem={updateItem}
                                            removeItem={removeItem}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
                        >
                            Update Category
                        </button>
                        <a
                            href="/admin/skills"
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
