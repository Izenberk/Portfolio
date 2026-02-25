"use client";

import { useState, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';

interface SortableItem {
  _id?: string;
  id?: string;
}

export function useSortableData<T extends SortableItem>(initialItems: T[]) {
  const [items, setItems] = useState<T[]>(initialItems);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.findIndex((item) => (item._id || item.id) === active.id);
      const newIndex = prev.findIndex((item) => (item._id || item.id) === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }, []);

  return { items, setItems, handleDragEnd };
}
