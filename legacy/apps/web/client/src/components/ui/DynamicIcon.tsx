import React from 'react';
import * as Fa from 'react-icons/fa';
import * as Si from 'react-icons/si';
import * as Md from 'react-icons/md';
import * as Bs from 'react-icons/bs';
import * as Io from 'react-icons/io5';
import * as Hi from 'react-icons/hi2';

// Map of allowed icon sets
const ICON_SETS: Record<string, any> = {
    Fa,
    Si,
    Md,
    Bs,
    Io,
    Hi
};

interface DynamicIconProps {
    icon: string;
    className?: string;
}

export default function DynamicIcon({ icon, className }: DynamicIconProps) {
    if (!icon) return null;

    // 1. Check if it's a URL (Image)
    if (icon.startsWith('http') || icon.startsWith('/')) {
        return (
            <img
                src={icon}
                alt="Skill Icon"
                className={className}
                width={24}
                height={24}
            />
        );
    }

    // 2. Check if it's a React Icon name (e.g. "FaReact", "SiNextdotjs")
    // We try to find the icon in our imported sets.
    // Optimization: We could guess the set based on the prefix (Fa*, Si*), but iterating is safe enough for this scale.

    let IconComponent = null;

    // Try to find the icon in the sets matching the prefix
    const prefix = icon.substring(0, 2);

    // Simple lookup based on common prefixes
    if (prefix === 'Fa' && ICON_SETS.Fa[icon]) IconComponent = ICON_SETS.Fa[icon];
    else if (prefix === 'Si' && ICON_SETS.Si[icon]) IconComponent = ICON_SETS.Si[icon];
    else if (prefix === 'Md' && ICON_SETS.Md[icon]) IconComponent = ICON_SETS.Md[icon];
    else if (prefix === 'Bs' && ICON_SETS.Bs[icon]) IconComponent = ICON_SETS.Bs[icon];
    else if (prefix === 'Io' && ICON_SETS.Io[icon]) IconComponent = ICON_SETS.Io[icon];
    else if (prefix === 'Hi' && ICON_SETS.Hi[icon]) IconComponent = ICON_SETS.Hi[icon];

    // Fallback: Search all sets if prefix didn't match (e.g. if user typed something weird or we missed a prefix)
    if (!IconComponent) {
        for (const setKey in ICON_SETS) {
            if (ICON_SETS[setKey][icon]) {
                IconComponent = ICON_SETS[setKey][icon];
                break;
            }
        }
    }

    if (IconComponent) {
        return <IconComponent className={className} />;
    }

    // 3. Fallback if nothing found
    return <span className="text-xs text-red-500">?</span>;
}
