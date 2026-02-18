import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableExperienceItemProps {
    exp: any;
    deleteExperience: (id: string) => void;
}

export function SortableExperienceItem({ exp, deleteExperience }: SortableExperienceItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: exp._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : 1,
        position: 'relative' as const,
    };

    return (
        <div ref={setNodeRef} style={style} className="bg-card border border-border rounded-xl p-6 shadow-sm flex justify-between items-start">
            <div className="flex gap-4 items-start">
                {/* Drag Handle */}
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className="mt-1 p-1 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing touch-none"
                    title="Drag to reorder"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7 2a1 1 0 10-2 0 1 1 0 002 0zM7 7a1 1 0 10-2 0 1 1 0 002 0zM7 12a1 1 0 10-2 0 1 1 0 002 0zM7 17a1 1 0 10-2 0 1 1 0 002 0zM13 2a1 1 0 10-2 0 1 1 0 002 0zM13 7a1 1 0 10-2 0 1 1 0 002 0zM13 12a1 1 0 10-2 0 1 1 0 002 0zM13 17a1 1 0 10-2 0 1 1 0 002 0z" />
                    </svg>
                </button>

                <div>
                    <h2 className="text-xl font-bold">{exp.role}</h2>
                    <p className="text-lg text-primary mb-1">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                        {new Date(exp.start).toLocaleDateString()} - {exp.end ? new Date(exp.end).toLocaleDateString() : 'Present'}
                        {exp.location && <span className="ml-2 text-muted-foreground/70">• {exp.location}</span>}
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                        {(exp.description || []).slice(0, 2).map((desc: string, i: number) => (
                            <li key={i}>{desc}</li>
                        ))}
                        {(exp.description || []).length > 2 && <li>...</li>}
                    </ul>
                    <div className="flex flex-wrap gap-1">
                        {(exp.tags || []).map((tag: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-2">
                <a
                    href={`/admin/experience/${exp._id}`}
                    className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded transition"
                >
                    Edit
                </a>
                <button
                    onClick={() => deleteExperience(exp._id)}
                    className="px-3 py-1 text-red-500 hover:bg-red-50 rounded transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
