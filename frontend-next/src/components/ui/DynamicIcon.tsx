"use client";

import React from 'react';
import * as Fa from 'react-icons/fa';
import * as Si from 'react-icons/si';
import * as Md from 'react-icons/md';
import * as Bs from 'react-icons/bs';
import * as Io from 'react-icons/io5';
import * as Hi from 'react-icons/hi2';

const ICON_SETS: Record<string, Record<string, React.ComponentType<{ className?: string }>>> = {
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

    if (icon.startsWith('http') || icon.startsWith('/')) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={icon}
                alt="Skill Icon"
                className={className}
                width={24}
                height={24}
            />
        );
    }

    let IconComponent: React.ComponentType<{ className?: string }> | null = null;

    const prefix = icon.substring(0, 2);

    if (prefix === 'Fa' && ICON_SETS.Fa[icon]) IconComponent = ICON_SETS.Fa[icon];
    else if (prefix === 'Si' && ICON_SETS.Si[icon]) IconComponent = ICON_SETS.Si[icon];
    else if (prefix === 'Md' && ICON_SETS.Md[icon]) IconComponent = ICON_SETS.Md[icon];
    else if (prefix === 'Bs' && ICON_SETS.Bs[icon]) IconComponent = ICON_SETS.Bs[icon];
    else if (prefix === 'Io' && ICON_SETS.Io[icon]) IconComponent = ICON_SETS.Io[icon];
    else if (prefix === 'Hi' && ICON_SETS.Hi[icon]) IconComponent = ICON_SETS.Hi[icon];

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

    return <span className="text-xs text-red-500">?</span>;
}
