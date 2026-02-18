// src/data/projects.ts
import { Project } from "@/types/project";


export const PROJECTS: Project[] = [
    {
        slug: "nextflix",
        title: "Nextflix",
        summary:
            "A Netflix-style movie discovery app built as a type-safe monorepo with Next.js (web) and NestJS (API).",
        details: [
            "Browse Now Playing, Popular, Top Rated, and Upcoming movies via TMDb; hero trailer with YouTube, responsive carousels, and modal detail view.",
            "Backend API with NestJS using Clean Architecture, versioned routes (/api/v1), and Swagger docs at /docs.",
            "Monorepo with Turborepo + pnpm workspaces; shared domain contracts (Zod/TypeScript), axios TMDb client, and end-to-end typing.",
            "Dockerized local dev; prepared for Vercel (web) and Render (API) deployment with environment-based config."
        ],
        stack: [
            "Next.js 15",
            "React",
            "TypeScript",
            "TailwindCSS",
            "shadcn/ui",
            "NestJS 11",
            "Node",
            "Axios",
            "TMDb API",
            "Turborepo",
            "pnpm",
            "Docker"
        ],
        links: {
            demo: "https://nextflix-web-application-web.vercel.app",
            repo: "https://github.com/Izenberk/nextflix-web-application"
        },
        image: "/images/Nextflix-thumnail-1.png",
        contributors: "Izenberk"
    },
    {
        slug: "hugpaw",
        title: "HugPaw Ecommerce",
        summary:
        "A Full-Stack E-Commerce Web Application built with MERN stack and Vite.",
        details: [
        "Developed e-commerce web app with product catalog, shopping cart, user authentication, admin dashboard, and payment mockup.",
        "Collaborated in an Agile team using GitHub for version control, issue tracking, and code reviews.",
        ],
        stack: ["React", "Vite", "Tailwind", "Node", "Express", "MongoDB", "shadcn/ui"],
        links: {
        demo: "https://hug-paw-ecommerce.vercel.app/",
        repo: "https://github.com/Izenberk/HugPaw-Ecommerce-Frontend",
        },
        image: "/images/hugpaw-cover.png",
        contributors: "JSD Bootcamp Team",
    },
];