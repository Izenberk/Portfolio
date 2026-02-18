import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { SkillsService } from '../skills/skills.service';
import { ExperienceService } from '../experience/experience.service';

import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService {
    constructor(
        private readonly projectsService: ProjectsService,
        private readonly skillsService: SkillsService,
        private readonly experienceService: ExperienceService,
        private readonly usersService: UsersService,
    ) { }

    async seed() {
        const projects = [
            {
                slug: "nextflix",
                title: "Nextflix",
                summary: "A Netflix-style movie discovery app built as a type-safe monorepo with Next.js (web) and NestJS (API).",
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
                contributors: "Izenberk",
                order: 0
            },
            {
                slug: "hugpaw",
                title: "HugPaw Ecommerce",
                summary: "A Full-Stack E-Commerce Web Application built with MERN stack and Vite.",
                details: [
                    "Developed e-commerce web app with product catalog, shopping cart, user authentication, admin dashboard, and payment mockup.",
                    "Collaborated in an Agile team using GitHub for version control, issue tracking, and code reviews."
                ],
                stack: ["React", "Vite", "Tailwind", "Node", "Express", "MongoDB", "shadcn/ui"],
                links: {
                    demo: "https://hug-paw-ecommerce.vercel.app/",
                    repo: "https://github.com/Izenberk/HugPaw-Ecommerce-Frontend"
                },
                image: "/images/hugpaw-cover.png",
                contributors: "JSD Bootcamp Team",
                order: 1
            }
        ];

        const skills = [
            {
                title: "Languages",
                items: [
                    {
                        name: "TypeScript",
                        level: "Expert",
                        icon: "SiTypescript",
                        description: `Strongly typed JavaScript for safer, more predictable code. Applied generics, enums, interfaces, and union types for scalable architecture.

### Highlights
* Shared type contracts across monorepo packages
* Strict mode and structural typing ensured API stability

### Applied In
* Nextflix
* HugPaw`
                    },
                    {
                        name: "JavaScript",
                        level: "Expert",
                        icon: "SiJavascript",
                        description: `Core logic layer for all projects, mastering modern ES6+ syntax, async/await, closures, and functional patterns.

### Highlights
* Extensive use of async data fetching, array/object transformations, and error handling
* Deep understanding of event loop and async flow

### Applied In
* Nextflix
* HugPaw`
                    }
                ],
                order: 0
            },
            {
                title: "Backend & Automation",
                items: [
                    {
                        name: "NestJS",
                        level: "Advanced",
                        icon: "SiNestjs",
                        description: `Modular API with versioned routes, providers, and clean layering.

### Highlights
* Movies module with service/use-cases and TMDb client
* Global validation pipes and URI versioning (/api/v1)

### Applied In
* Nextflix`
                    },
                    {
                        name: "Node.js",
                        level: "Advanced",
                        icon: "SiNodedotjs",
                        description: `API runtime with environment-driven config and Dockerized workflows.

### Applied In
* Nextflix
* HugPaw`
                    },
                    {
                        name: "Express",
                        level: "Advanced",
                        icon: "SiExpress",
                        description: `Routing, controllers, auth middleware, and error handling for REST APIs.

### Applied In
* HugPaw`
                    },
                    {
                        name: "Swagger/OpenAPI",
                        level: "Intermediate",
                        icon: "SiSwagger",
                        description: `Autogenerated API docs for faster iteration and testing at /docs.

### Applied In
* Nextflix`
                    },
                    {
                        name: "n8n",
                        level: "Intermediate",
                        icon: "SiN8N",
                        description: `End-to-end process automation and service orchestration.

### Highlights
* Building custom workflows with advanced conditional logic and data mapping
* Seamlessly integrating third-party APIs with internal database systems`
                    }
                ],
                order: 1
            },
            {
                title: "Frontend",
                items: [
                    {
                        name: "Next.js",
                        level: "Expert",
                        icon: "SiNextdotjs",
                        description: `App Router, Server Actions, image optimization, route groups, and Suspense for streaming UI.

### Highlights
* Built responsive hero with trailer overlay and modal details
* Handled env-based API URLs and build-time optimizations

### Applied In
* Nextflix`
                    },
                    {
                        name: "React",
                        level: "Expert",
                        icon: "SiReact",
                        description: `Built scalable, component-driven UIs with Suspense data fetching, hooks, accessibility (a11y), and performance tuning.

### Highlights
* Reusable UI patterns: cards, modals, skeletons, media banners
* Client/Server Components composition with clean boundaries

### Applied In
* Nextflix
* HugPaw`
                    },
                    {
                        name: "TailwindCSS",
                        level: "Expert",
                        icon: "SiTailwindcss",
                        description: `Utility-first styling, responsive grids, design tokens, and dark-friendly surfaces.

### Applied In
* Nextflix
* HugPaw`
                    },
                    {
                        name: "shadcn/ui",
                        level: "Advanced",
                        icon: "SiShadcnui",
                        description: `Accessible primitives with consistent theming for production-ready components.

### Applied In
* Nextflix
* HugPaw`
                    },
                    {
                        name: "Framer Motion",
                        level: "Intermediate",
                        icon: "SiFramer",
                        description: `Micro-interactions and carousel transitions for smoother UX.

### Applied In
* Nextflix`
                    }
                ],
                order: 2
            },
            {
                title: "Database",
                items: [
                    {
                        name: "PostgreSQL",
                        level: "Intermediate",
                        icon: "SiPostgresql",
                        description: `Relational modeling and analytics use-cases (separate data eng work).`
                    },
                    {
                        name: "MongoDB",
                        level: "Advanced",
                        icon: "SiMongodb",
                        description: `Schema-based models (Mongoose), lean queries, and aggregations.

### Applied In
* HugPaw`
                    }
                ],
                order: 3
            },
            {
                title: "DevOps & Environment",
                items: [
                    {
                        name: "Linux / Bash",
                        level: "Advanced",
                        icon: "SiGnubash",
                        description: `Direct system interaction for efficient task automation and environment control.

### Highlight
* Docker & Server Management
* Shell Scripting & Git Operations`
                    },
                    {
                        name: "Docker",
                        level: "Intermediate",
                        icon: "SiDocker",
                        description: `Multi-stage builds and reproducible dev/prod environments.

### Applied In
* Nextflix
* HugPaw`
                    },
                    {
                        name: "Git",
                        level: "Advanced",
                        icon: "SiGit",
                        description: `Branching, PR reviews, semantic commits, and release tagging.

### Applied In
* Nextflix
* HugPaw`
                    },
                    {
                        name: "GitHub",
                        level: "Advanced",
                        icon: "SiGithub",
                        description: `Issues/Projects, code reviews, and basic CI/CD pipelines.

[GitHub profile](https://github.com/Izenberk)`
                    },
                    {
                        name: "pnpm",
                        level: "Advanced",
                        icon: "SiPnpm",
                        description: `Fast, disk-efficient package management across workspaces/monorepo.

### Applied In
* Nextflix`
                    },
                    {
                        name: "Vercel",
                        level: "Intermediate",
                        icon: "SiVercel",
                        description: `Deployed frontend with preview builds and environment management.

### Applied In
* Nextflix
* HugPaw`
                    },
                    {
                        name: "Render",
                        level: "Intermediate",
                        icon: "SiRender",
                        description: `Deployed backend APIs with managed SSL and env vars.

### Applied In
* Nextflix
* HugPaw`
                    }
                ],
                order: 4
            }
        ];

        const experience = [
            {
                id: "workflow-automation-developer-2025",
                role: "Workflow Automation Developer",
                company: "MAX GADGET CO., LTD",
                start: "2025-11-10",
                end: null,
                location: "Pak Kret, Nonthaburi, TH",
                tags: ["Workflow Automation", "n8n", "REST APIs", "API Integration"],
                description: [
                    "Orchestrating end-to-end automation by combining low-code speed with custom JavaScript logic",
                    "Building scalable integration architectures that connect internal tools with external SaaS platforms"
                ],
                url: "https://www.remaxthailand.co.th/",
                order: 0
            },
            {
                id: "gen-th-bootcamp-2025",
                role: "Junior Software Developer Bootcamp",
                company: "Generation Thailand",
                url: "https://thailand.generation.org/",
                start: "Jun 2025",
                end: "Sep 2025",
                location: "Bangkok, TH",
                description: [
                    "Developed full-stack skills with the MERN stack through hands-on, project-based learning",
                    "Built apps end-to-end: frontend, backend, database integration, Git workflows, and Agile collaboration"
                ],
                tags: ["MongoDB", "Express", "React", "Node.js", "Git", "Agile"],
                order: 1
            },
            {
                id: "rhb-associate-deriv-2022-2025",
                role: "Associate Derivatives Trader",
                company: "RHB Securities (Thailand) PCL",
                url: "",
                start: "Jul 2022",
                end: "Apr 2025",
                location: "Bangkok, TH",
                description: [
                    "Collaborated across functions to manage high-stakes decisions and ensure accurate, real-time data handling",
                    "Applied analytical thinking under pressure to interpret complex information and maintain system integrity"
                ],
                tags: ["Collaboration", "Data-driven Decisions", "Risk Management"],
                order: 2
            }
        ];

        const results = {
            projects: { success: 0, failed: 0 },
            skills: { success: 0, failed: 0 },
            experience: { success: 0, failed: 0 },
        };

        for (const p of projects) {
            try {
                await this.projectsService.upsert(p);
                results.projects.success++;
            } catch (e) {
                results.projects.failed++;
            }
        }

        for (const s of skills) {
            try {
                await this.skillsService.upsert(s);
                results.skills.success++;
            } catch (e) {
                results.skills.failed++;
            }
        }

        for (const e of experience) {
            try {
                await this.experienceService.upsert(e);
                results.experience.success++;
            } catch (err) {
                results.experience.failed++;
            }
        }

        // Seed Admin User
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (adminEmail && adminPassword) {
            const existingUser = await this.usersService.findByEmail(adminEmail);
            if (existingUser) {
                // Update password if user exists
                await this.usersService.update(existingUser._id.toString(), { password: adminPassword });
                console.log(`Admin user ${adminEmail} updated.`);
            } else {
                // Create new user
                await this.usersService.create(adminEmail, adminPassword);
                console.log(`Admin user ${adminEmail} created.`);
            }
        } else {
            console.log('Skipping admin user seed: ADMIN_EMAIL or ADMIN_PASSWORD not set.');
        }

        return { message: 'Seeding complete', results };
    }
}
