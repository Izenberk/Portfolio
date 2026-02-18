import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DynamicIcon from '@/components/ui/DynamicIcon';

interface SortableSkillItemProps {
    id: string;
    index: number;
    item: any;
    updateItem: (index: number, field: string, value: string) => void;
    removeItem: (index: number) => void;
}

export function SortableSkillItem({ id, index, item, updateItem, removeItem }: SortableSkillItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : 1,
        position: 'relative' as const,
    };

    return (
        <div ref={setNodeRef} style={style} className="p-4 border border-border rounded-lg bg-muted/30 space-y-3">
            <div className="flex gap-2 items-start">
                {/* Drag Handle */}
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className="mt-2 p-1 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing touch-none"
                    title="Drag to reorder"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7 2a1 1 0 10-2 0 1 1 0 002 0zM7 7a1 1 0 10-2 0 1 1 0 002 0zM7 12a1 1 0 10-2 0 1 1 0 002 0zM7 17a1 1 0 10-2 0 1 1 0 002 0zM13 2a1 1 0 10-2 0 1 1 0 002 0zM13 7a1 1 0 10-2 0 1 1 0 002 0zM13 12a1 1 0 10-2 0 1 1 0 002 0zM13 17a1 1 0 10-2 0 1 1 0 002 0z" />
                    </svg>
                </button>

                <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(index, 'name', e.target.value)}
                            placeholder="Skill Name"
                            className="flex-1 px-3 py-2 rounded-lg border border-border bg-background"
                            required
                        />
                        <select
                            value={item.level}
                            onChange={(e) => updateItem(index, 'level', e.target.value)}
                            className="px-3 py-2 rounded-lg border border-border bg-background"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                        </select>
                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="flex gap-2 items-center">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={item.icon || ''}
                                onChange={(e) => updateItem(index, 'icon', e.target.value)}
                                placeholder="Icon URL or React Icon Name (e.g. FaReact)"
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Find icon names here: <a href="https://react-icons.github.io/react-icons/" target="_blank" rel="noreferrer" className="text-primary hover:underline">React Icons</a>
                            </p>
                        </div>
                        {item.icon && (
                            <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-lg border border-border">
                                <DynamicIcon icon={item.icon} className="w-6 h-6 text-primary" />
                            </div>
                        )}
                    </div>

                    <textarea
                        value={item.description || ''}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        placeholder="Description (Markdown supported)"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm min-h-[100px] resize-y"
                    />
                </div>
            </div>
        </div>
    );
}
