"use client";

import { useState } from "react";
import { API_URL } from "@/lib/config";
import { Plus, X, GripVertical } from "lucide-react";
import DynamicIcon from "@/components/ui/DynamicIcon";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SkillItem {
  name: string;
  level: string;
  icon: string;
  description: string;
}

function SortableSkillRow({
  item,
  index,
  onUpdate,
  onRemove,
}: {
  item: SkillItem;
  index: number;
  onUpdate: (index: number, field: keyof SkillItem, value: string) => void;
  onRemove: (index: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `skill-${index}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-3 rounded-lg border border-border bg-card/50 p-3">
      <button type="button" className="mt-2 cursor-grab hover:text-primary shrink-0" {...attributes} {...listeners}>
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </button>
      <div className="flex-1 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Name</label>
          <input value={item.name} onChange={(e) => onUpdate(index, "name", e.target.value)} placeholder="Skill name" className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Level</label>
          <select value={item.level} onChange={(e) => onUpdate(index, "level", e.target.value)} className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Icon</label>
          <div className="flex items-center gap-2">
            <input value={item.icon} onChange={(e) => onUpdate(index, "icon", e.target.value)} placeholder="e.g. SiReact" className="flex-1 rounded border border-border bg-background px-2 py-1.5 text-sm" />
            {item.icon && (
              <span className="inline-flex items-center justify-center rounded bg-primary/10 p-1.5">
                <DynamicIcon icon={item.icon} className="h-5 w-5 text-primary" />
              </span>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-muted-foreground">Description</label>
          <textarea value={item.description} onChange={(e) => onUpdate(index, "description", e.target.value)} rows={2} placeholder="Brief description (supports markdown)" className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm" />
        </div>
      </div>
      <button type="button" onClick={() => onRemove(index)} className="mt-2 rounded p-1.5 text-muted-foreground hover:text-destructive" aria-label="Remove skill">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function NewSkillPage() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<SkillItem[]>([]);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function addItem() {
    setItems((prev) => [...prev, { name: "", level: "Intermediate", icon: "", description: "" }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof SkillItem, value: string) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = parseInt(String(active.id).replace("skill-", ""));
        const newIndex = parseInt(String(over.id).replace("skill-", ""));
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_URL}/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, items }),
      });
      if (!res.ok) throw new Error("Failed to create");
      window.location.href = "/admin/skills";
    } catch {
      alert("Error creating skill category");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8 shadow-sm">
      <h1 className="text-2xl font-bold mb-6">New Skill Category</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Category Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Skills</label>
            <button type="button" onClick={addItem} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Add Skill
            </button>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((_, i) => `skill-${i}`)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {items.map((item, i) => (
                  <SortableSkillRow key={`skill-${i}`} item={item} index={i} onUpdate={updateItem} onRemove={removeItem} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="pt-4 flex gap-4">
          <button type="submit" disabled={saving} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50">
            {saving ? "Saving..." : "Create Category"}
          </button>
          <a href="/admin/skills" className="px-6 py-2 border border-border rounded-lg font-medium hover:bg-muted transition">Cancel</a>
        </div>
      </form>
    </div>
  );
}
