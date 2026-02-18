// src/data/experience.ts
import { ExperienceItem } from "@/types/sections";

export const EXPERIENCE: ExperienceItem[] = [
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
            "Built apps end-to-end: frontend, backend, database integration, Git workflows, and Agile collaboration",
        ],
        tags: ["MongoDB", "Express", "React", "Node.js", "Git", "Agile"],
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
            "Applied analytical thinking under pressure to interpret complex information and maintain system integrity",
        ],
        tags: ["Collaboration", "Data-driven Decisions", "Risk Management"],
    },
];
