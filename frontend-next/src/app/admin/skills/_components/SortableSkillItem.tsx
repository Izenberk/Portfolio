"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import DynamicIcon from "@/components/ui/DynamicIcon";
import type { SkillItem, SkillLevel } from "@/types/sections";

const SKILL_LEVELS: SkillLevel[] = ["Beginner", "Intermediate", "Advanced"];

interface SortableSkillItemProps {
  item: SkillItem;
  index: number;
  onChange: (index: number, updated: SkillItem) => void;
  onRemove: (index: number) => void;
}

export default function SortableSkillItem({
  item,
  index,
  onChange,
  onRemove,
}: SortableSkillItemProps) {
  const sortableId = item._id ?? `skill-${index}`;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sortableId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  function update(field: keyof SkillItem, value: string) {
    onChange(index, { ...item, [field]: value });
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-3 rounded-lg border border-border bg-card/50 p-3"
    >
      <button
        type="button"
        className="mt-2 cursor-grab text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <div className="flex-1 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Name</label>
          <input
            value={item.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded border border-border bg-card px-2 py-1.5 text-sm text-foreground"
            placeholder="Skill name"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Level</label>
          <select
            value={item.level ?? ""}
            onChange={(e) => update("level", e.target.value)}
            className="w-full rounded border border-border bg-card px-2 py-1.5 text-sm text-foreground"
          >
            <option value="">Select level</option>
            {SKILL_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Icon</label>
          <div className="flex items-center gap-2">
            <input
              value={item.icon ?? ""}
              onChange={(e) => update("icon", e.target.value)}
              className="flex-1 rounded border border-border bg-card px-2 py-1.5 text-sm text-foreground"
              placeholder="e.g. SiReact, FaCode"
            />
            {item.icon && (
              <span className="inline-flex items-center justify-center rounded bg-primary/10 p-1.5">
                <DynamicIcon icon={item.icon} className="h-5 w-5 text-primary" />
              </span>
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-muted-foreground">Description</label>
          <textarea
            value={item.description ?? ""}
            onChange={(e) => update("description", e.target.value)}
            rows={2}
            className="w-full rounded border border-border bg-card px-2 py-1.5 text-sm text-foreground"
            placeholder="Brief description (supports markdown)"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(index)}
        className="mt-2 rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        aria-label={`Remove ${item.name || "skill"}`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
