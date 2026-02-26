"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";
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
import { GripVertical } from "lucide-react";

interface Experience {
  _id: string;
  role: string;
  company: string;
  start: string;
  end: string;
}

function SortableRow({ item, onDelete }: { item: Experience; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b border-border last:border-0 hover:bg-muted/20 bg-card">
      <td className="p-4 w-10">
        <button className="cursor-grab hover:text-primary" {...attributes} {...listeners}>
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </td>
      <td className="p-4 font-medium">{item.role}</td>
      <td className="p-4 text-muted-foreground">{item.company}</td>
      <td className="p-4 text-muted-foreground">{item.start} — {item.end || "Present"}</td>
      <td className="p-4">
        <div className="flex items-center justify-end gap-4">
          <a href={`/admin/experience/${item._id}`} className="text-blue-500 hover:underline">Edit</a>
          <button onClick={() => onDelete(item._id)} className="text-red-500 hover:underline">Delete</button>
        </div>
      </td>
    </tr>
  );
}

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetch(`${API_URL}/experience`)
      .then((res) => res.json())
      .then((data) => setItems(data ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i._id === active.id);
        const newIndex = prev.findIndex((i) => i._id === over.id);
        const reordered = arrayMove(prev, oldIndex, newIndex);

        const token = localStorage.getItem("admin_token");
        fetch(`${API_URL}/experience/reorder`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reordered.map((e, i) => ({ id: e._id, order: i }))),
        });

        return reordered;
      });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    const token = localStorage.getItem("admin_token");
    const res = await fetch(`${API_URL}/experience/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setItems((prev) => prev.filter((e) => e._id !== id));
    } else {
      alert("Failed to delete experience");
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading experience...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Experience Manager</h1>
        <div className="flex gap-4">
          <a href="/admin/experience/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
            + Add Experience
          </a>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <table className="w-full text-left">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="p-4 w-10"></th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium">Period</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <SortableContext items={items.map((i) => i._id)} strategy={verticalListSortingStrategy}>
              <tbody>
                {items.map((item) => (
                  <SortableRow key={item._id} item={item} onDelete={handleDelete} />
                ))}
              </tbody>
            </SortableContext>
          </table>
        </DndContext>
      </div>
    </div>
  );
}
