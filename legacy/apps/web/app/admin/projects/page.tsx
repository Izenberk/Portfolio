'use client';

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useSortableData } from "@/hooks/useSortableData";

import { API_URL } from '@/lib/config';

// Sortable Item Component
function SortableProjectRow({ project, onDelete }: { project: any; onDelete: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: project._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-b border-border last:border-0 hover:bg-muted/20 bg-card"
    >
      <td className="p-4 w-10">
        <button {...attributes} {...listeners} className="cursor-grab hover:text-primary">
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </td>
      <td className="p-4 font-medium">{project.title}</td>
      <td className="p-4 text-muted-foreground">{project.slug}</td>
      <td className="p-4">
        <div className="flex items-center justify-end gap-4">
          <a
            href={`/admin/projects/${project._id}`}
            className="text-blue-500 hover:underline"
          >
            Edit
          </a>
          <button
            onClick={() => onDelete(project._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function ProjectsAdminPage() {
  const {
    items: projects,
    loading,
    hasOrderChanged,
    handleDragEnd,
    saveOrder,
    removeItem
  } = useSortableData(
    `${API_URL}/api/projects`,
    `${API_URL}/api/projects/reorder/all`,
    "ids-array"
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/api/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    removeItem(id);
  };

  if (loading) return <div className="p-8 text-center">Loading project...</div>

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Projects Manager</h1>
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
              href="/admin/projects/new"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
            >
              + Add Project
            </a>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <table className="w-full text-left">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="p-4 w-10"></th>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Slug</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <SortableContext
                  items={projects.map((p) => p._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {projects.map((project) => (
                    <SortableProjectRow
                      key={project._id}
                      project={project}
                      onDelete={deleteProject}
                    />
                  ))}
                </SortableContext>
              </tbody>
            </table>
          </DndContext>

          {projects.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No projects found. Create one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}