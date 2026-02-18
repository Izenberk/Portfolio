// src/types/project.ts
export type Project = {
    _id?: string;
    slug: string;
    title: string;
    summary: string;
    details: string[];
    stack: string[];
    links: { demo: string; repo: string };
    image: string;
    contributors: string;
    order?: number;
};