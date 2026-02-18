import type { SkillCategory } from "@/types/sections"

export const SKILLS: SkillCategory[] = [
    {
        title: 'Languages',
        items: [
        { name: 'TypeScript', level: 'Advanced' },
        { name: 'JavaScript (ES2023)', level: 'Advanced' },
        { name: 'SQL', level: 'Intermediate' },
        { name: 'Python', level: 'Intermediate' },
        ],
    },
    {
        title: 'Frontend',
        items: [
        { name: 'React', level: 'Advanced' },
        { name: 'Vite', level: 'Advanced' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'shadcn/ui', level: 'Advanced' },
        ],
    },
    {
        title: 'Backend',
        items: [
        { name: 'Node.js', level: 'Intermediate' },
        { name: 'Express', level: 'Intermediate' },
        { name: 'MongoDB', level: 'Intermediate' },
        { name: 'REST API Design', level: 'Intermediate' },
        ],
    },
    {
        title: 'Testing & Tooling',
        items: [
        { name: 'Vitest', level: 'Intermediate' },
        { name: 'React Testing Library', level: 'Intermediate' },
        { name: 'ESLint + Prettier', level: 'Advanced' },
        { name: 'Git & GitHub', level: 'Advanced' },
        ],
    },
    {
        title: 'DevOps (Basics)',
        items: [
        { name: 'Docker', level: 'Intermediate' },
        { name: 'CI (GitHub Actions)', level: 'Intermediate' },
        { name: 'Vercel', level: 'Intermediate' },
        ],
    },
]
