"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import type { SkillCategory } from "@/types/sections";

interface SortableSkillCategoryProps {
  category: SkillCategory;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function SortableSkillCategory({
  category,
  onEdit,
  onDelete,
}: SortableSkillCategoryProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category._id ?? category.title });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
    >
      <button
        type="button"
        className="cursor-grab text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold">{category.title}</h3>
        <p className="text-sm text-muted-foreground">
          {category.items.length} skill{category.items.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(category._id ?? "")}
          className="rounded p-2 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
          aria-label={`Edit ${category.title}`}
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(category._id ?? "")}
          className="rounded p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Delete ${category.title}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
