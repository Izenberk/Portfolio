import { X, Plus } from "lucide-react";
import { useState, useRef } from "react";

interface DynamicListInputProps {
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    label?: string;
}

export default function DynamicListInput({
    value = [],
    onChange,
    placeholder = "Add item...",
    label,
}: DynamicListInputProps) {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleAdd = () => {
        if (inputValue.trim()) {
            onChange([...value, inputValue.trim()]);
            setInputValue("");
            // Keep focus on input for rapid entry
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    const handleRemove = (index: number) => {
        const newValue = [...value];
        newValue.splice(index, 1);
        onChange(newValue);
    };

    return (
        <div className="space-y-3">
            {label && <label className="block text-sm font-medium">{label}</label>}

            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add
                </button>
            </div>

            {value.length > 0 && (
                <ul className="space-y-2">
                    {value.map((item, index) => (
                        <li
                            key={index}
                            className="group flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition"
                        >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                            <span className="flex-1 text-sm leading-relaxed break-words">{item}</span>
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="text-muted-foreground hover:text-destructive transition opacity-0 group-hover:opacity-100 p-1"
                                aria-label="Remove item"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
