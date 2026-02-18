"use client"

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillCategory, SkillItem } from "@/types/sections";
import ReactMarkdown from 'react-markdown';
import Section from "@/components/layout/Section";

import DynamicIcon from "@/components/ui/DynamicIcon";

// Minimal modal
function SimpleModal({
  open,
  onClose,
  title,
  icon,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div className="relative z-[101] w-[min(92vw,640px)] rounded-xl border border-border/60 bg-card p-5 shadow-xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center gap-3 mb-4 sticky top-0 bg-card pb-2 border-b border-border/50">
          {icon && (
            <span className="inline-flex items-center justify-center rounded-md bg-primary/10 p-2">
              <DynamicIcon icon={icon} className="w-6 h-6 text-primary" />
            </span>
          )}
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="ml-auto rounded-md px-2 py-1 text-sm text-foreground/70 hover:bg-foreground/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="text-sm text-foreground/80 prose prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

import * as SimpleIcons from "simple-icons";

// Helper to find brand color dynamically
function getBrandColor(iconName?: string): string | undefined {
  if (!iconName) return undefined;

  // 1. Check if it's a SimpleIcon (Si prefix)
  if (iconName.startsWith("Si")) {
    // Convert SiReact -> siReact to match simple-icons export convention
    // actually simple-icons exports are usually like 'siReact', 'siNextdotjs'
    // Let's try to find the matching key in SimpleIcons
    const key = "si" + iconName.slice(2);
    const iconData = (SimpleIcons as any)[key];
    if (iconData && iconData.hex) {
      return "#" + iconData.hex;
    }
  }

  return undefined;
}

function SkillRow({
  item,
  onClick,
  className,
}: {
  item: SkillItem
  onClick: (item: SkillItem) => void
  className?: string
}) {
  const baseBtn =
    "inline-flex items-center gap-4 md:gap-5 w-full text-left " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const brandColor = getBrandColor(item.icon);

  return (
    <li className="flex items-center gap-4 md:gap-5 text-base md:text-lg">
      <button
        type="button"
        onClick={() => onClick(item)}
        className={className ? `${baseBtn} ${className}` : baseBtn}
        aria-label={`Show details for ${item.name}`}
      >
        {/* Badge icon */}
        <span
          className="
            skill-icon
            inline-flex items-center justify-center rounded-lg
            w-11 h-11 md:w-12 md:h-12
            ring-1 ring-inset transition-all duration-300
          "
          style={{
            backgroundColor: brandColor ? `${brandColor}15` : 'hsl(var(--primary) / 0.1)',
            color: brandColor || 'hsl(var(--primary))',
            boxShadow: brandColor ? `0 0 0 1px ${brandColor}30` : undefined
          }}
        >
          {item.icon && <DynamicIcon icon={item.icon} className="w-6 h-6" />}
        </span>

        <span className="flex-1 min-w-0">
          <span className="font-medium">{item.name}</span>
          <span className="ml-2 align-middle text-xs text-foreground/60 group-hover:text-foreground/80">
            click to see details
          </span>
        </span>

        <span className="ml-auto text-xs text-foreground/50 group-hover:text-foreground/80">
          Learn more →
        </span>
      </button>
    </li>
  );
}

export default function Skills({ data }: { data: SkillCategory[] }) {
  const [activeItem, setActiveItem] = useState<SkillItem | null>(null);

  return (
    <Section id="skills" className="py-16 md:py-24" containerClassName="max-w-5xl">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">Skills</h2>
        <div className="hidden md:block text-xs text-foreground/60">Click a skill to see details</div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((category) => (
          <Card
            key={category.title}
            className="
              group transition-all duration-300 border border-border/80 bg-card/50
              hover:-translate-y-1 hover:bg-primary/25
            "
          >
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-xl md:text-2xl">{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="flex flex-col gap-4 md:gap-5">
                {category.items.map((item) => (
                  <SkillRow
                    key={item.name}
                    item={item}
                    onClick={setActiveItem}
                    className="hover:-translate-y-0.5  hover:cursor-pointer"
                  />
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <SimpleModal
        open={!!activeItem}
        onClose={() => setActiveItem(null)}
        title={activeItem?.name ?? ""}
        icon={activeItem?.icon}
      >
        {(() => {
          if (!activeItem?.description) {
            return <p className="text-muted-foreground italic">No description available.</p>;
          }

          // Split description to find "### Applied In"
          const parts = activeItem.description.split(/### Applied In/i);
          const mainContent = parts[0];
          const appliedInContent = parts[1];

          return (
            <>
              <ReactMarkdown
                components={{
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1 my-2" {...props} />,
                  li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mt-4 mb-2" {...props} />
                }}
              >
                {mainContent}
              </ReactMarkdown>

              {appliedInContent && (
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Applied In
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {appliedInContent
                      .split('\n')
                      .map(line => line.replace(/^\*\s*/, '').trim()) // Remove bullets
                      .filter(line => line.length > 0)
                      .map(project => (
                        <span
                          key={project}
                          className="
                            inline-flex items-center rounded-full 
                            bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground
                            border border-border/50
                          "
                        >
                          {project}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </SimpleModal>
    </Section>
  );
}
