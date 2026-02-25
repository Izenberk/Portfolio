"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import type { ExperienceItem } from "@/types/sections";

interface SortableExperienceItemProps {
  item: ExperienceItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function SortableExperienceItem({
  item,
  onEdit,
  onDelete,
}: SortableExperienceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._id ?? `${item.company}-${item.role}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
    >
      <button
        type="button"
        className="mt-1 cursor-grab text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold">{item.role}</h3>
        <p className="text-sm text-muted-foreground">
          {item.company}
          {item.location ? ` — ${item.location}` : ""}
        </p>
        <p className="text-xs text-muted-foreground">
          {item.start} — {item.end}
        </p>
        {item.description.length > 0 && (
          <p className="mt-1 text-xs text-muted-foreground/70 line-clamp-2">
            {item.description[0]}
          </p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(item._id ?? "")}
          className="rounded p-2 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
          aria-label={`Edit ${item.role}`}
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(item._id ?? "")}
          className="rounded p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Delete ${item.role}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
