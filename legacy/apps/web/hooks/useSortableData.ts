import { useState, useEffect, useCallback } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

interface BaseItem {
    _id: string;
    [key: string]: any;
}

type SaveStrategy = 'ids-array' | 'ordered-objects';

export function useSortableData<T extends BaseItem>(
    fetchUrl: string,
    reorderUrl: string,
    saveStrategy: SaveStrategy = 'ordered-objects'
) {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasOrderChanged, setHasOrderChanged] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(fetchUrl);
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    }, [fetchUrl]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((currentItems) => {
                const oldIndex = currentItems.findIndex((i) => i._id === active.id);
                const newIndex = currentItems.findIndex((i) => i._id === over?.id);
                return arrayMove(currentItems, oldIndex, newIndex);
            });
            setHasOrderChanged(true);
        }
    };

    const saveOrder = async () => {
        const token = localStorage.getItem("token");
        let body;

        if (saveStrategy === 'ids-array') {
            body = JSON.stringify({ ids: items.map(i => i._id) });
        } else {
            body = JSON.stringify(items.map((item, index) => ({
                id: item._id,
                order: index
            })));
        }

        try {
            await fetch(reorderUrl, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body,
            });

            setHasOrderChanged(false);
            alert("Order saved!");
        } catch (error) {
            console.error("Failed to save order:", error);
            alert("Failed to save order.");
        }
    };

    // Helper to manually remove an item (e.g. after delete)
    const removeItem = (id: string) => {
        setItems(prev => prev.filter(i => i._id !== id));
    };

    return {
        items,
        loading,
        hasOrderChanged,
        handleDragEnd,
        saveOrder,
        removeItem
    };
}
