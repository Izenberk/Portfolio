"use client";

import { Project } from "@/types/project";
import ProjectCard from "@/components/projects/ProjectCard";
import Section from "@/components/layout/Section";

export default function Projects({ data }: { data: Project[] }) {
  if (!data?.length) return null;

  return (
    <Section id="projects" className="py-16 md:py-24" containerClassName="max-w-5xl">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Projects
        </h2>
        <span className="hidden md:inline-block text-xs text-muted-foreground">
          Enter to focus, Tab through actions ✨
        </span>
      </div>

      <div className="mt-10 grid gap-10 grid-cols-1 md:grid-cols-2">
        {data.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </Section>
  );
}
