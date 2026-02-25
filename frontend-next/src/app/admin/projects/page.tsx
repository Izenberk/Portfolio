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

interface Project {
  _id: string;
  title: string;
  slug: string;
}

function SortableRow({ project, onDelete }: { project: Project; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project._id,
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
      <td className="p-4 font-medium">{project.title}</td>
      <td className="p-4 text-muted-foreground">{project.slug}</td>
      <td className="p-4">
        <div className="flex items-center justify-end gap-4">
          <a href={`/admin/projects/${project._id}`} className="text-blue-500 hover:underline">Edit</a>
          <button onClick={() => onDelete(project._id)} className="text-red-500 hover:underline">Delete</button>
        </div>
      </td>
    </tr>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data ?? []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((i) => i._id === active.id);
        const newIndex = items.findIndex((i) => i._id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const token = localStorage.getItem("admin_token");
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } else {
      alert("Failed to delete project");
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading projects...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects Manager</h1>
        <div className="flex gap-4">
          <a href="/admin/projects/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
            + Add Project
          </a>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <table className="w-full text-left">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="p-4 w-10"></th>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Slug</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <SortableContext items={projects.map((p) => p._id)} strategy={verticalListSortingStrategy}>
              <tbody>
                {projects.map((project) => (
                  <SortableRow key={project._id} project={project} onDelete={handleDelete} />
                ))}
              </tbody>
            </SortableContext>
          </table>
        </DndContext>
      </div>
    </div>
  );
}
