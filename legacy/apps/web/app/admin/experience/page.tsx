'use client';

import { useState, useEffect } from 'react';
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
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableExperienceItem } from './_components/SortableExperienceItem';
import { useSortableData } from "@/hooks/useSortableData";

import { API_URL } from '@/lib/config';

export default function ExperienceAdminPage() {
    const {
        items: experiences,
        loading,
        hasOrderChanged,
        handleDragEnd,
        saveOrder,
        removeItem
    } = useSortableData(
        `${API_URL}/api/experience`,
        `${API_URL}/api/experience/reorder`,
        "ordered-objects"
    );

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const deleteExperience = async (id: string) => {
        if (!confirm('Are you sure you want to delete this experience?')) return;

        const token = localStorage.getItem('token');
        await fetch(`${API_URL}/api/experience/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });

        removeItem(id);
    };

    if (loading) return <div className="p-8 text-center">Loading experience...</div>;

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Experience Manager</h1>
                    <div className="flex gap-4">
                        {hasOrderChanged && (
                            <button
                                onClick={saveOrder}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition animate-pulse"
                            >
                                Save Order
                            </button>
                        )}
                        <a
                            href="/admin/experience/new"
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
                        >
                            + Add Experience
                        </a>
                    </div>
                </div>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={experiences.map(e => e._id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="grid gap-6">
                            {experiences.map((exp: any) => (
                                <SortableExperienceItem
                                    key={exp._id}
                                    exp={exp}
                                    deleteExperience={deleteExperience}
                                />
                            ))}

                            {experiences.length === 0 && (
                                <div className="text-center p-8 text-muted-foreground border border-dashed border-border rounded-xl">
                                    No experience entries found. Add your work history!
                                </div>
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}
