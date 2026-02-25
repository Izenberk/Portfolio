"use client";

import { motion } from "framer-motion"
import { AuroraText } from "@/components/magicui/aurora-text"
import Section from "@/components/layout/Section"

export default function Hero() {
    const scrollToProjects = () => {
        const el = document.getElementById("projects");
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <Section id="home" className="relative pt-20 md:pt-28 min-h-[100dvh] overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 grid gap-8 pt-4 justify-center items-center">
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            >
            <span className="text-foreground/80 text-sm py-2 flex justify-center">
                FAST LEARNER • GROWTH MINDSET • FULL-STACK DEVELOPMENT
            </span>

            <motion.h1
            className="text-3xl md:text-5xl text-center font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            >
                Growing Every Day as a{" "}
                <AuroraText colors={["#18337D", "#2C5DE3"]}>
                Full-Stack Developer
            </AuroraText>
            </motion.h1>

            <motion.p
            className="mt-4 text-foreground/80 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            >
                Hi! I&apos;m Korn — a developer with a fast-learning mindset, eager to grow in
                full-stack development. I craft responsive UIs and scalable backends while
                continuously expanding my skills and adapting to new challenges.
            </motion.p>

            <motion.div
            className="mt-6 flex gap-3 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            >
                <motion.div whileHover={{ scale: 1.05 }}>
                    <button
                    onClick={scrollToProjects}
                    className="inline-flex items-center px-5 py-3 rounded-lg bg-primary text-primary-foreground cursor-pointer"
                    >
                    View Projects
                    </button>
                </motion.div>

                <motion.a
                    href="/Korn-aphichit_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center px-5 py-3 rounded-lg border border-border text-white/80 hover:bg-white/10 transition"
                    >
                    View CV
                </motion.a>
            </motion.div>

            <motion.div
            className="mt-6 flex gap-3 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", label: "TypeScript" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Node.js" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Express", extraClass: "invert" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB" },
                { src: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg", label: "Tailwind" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", label: "Git" },
                { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", label: "Docker" },
            ].map(({ src, label, extraClass }) => (
                <div key={label} className="flex flex-col items-center text-center text-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={label} className={`h-10 w-10 ${extraClass ?? ""}`} />
                    <span className="mt-2 text-foreground/70">{label}</span>
                </div>
            ))}
            </div>
            </motion.div>

            </motion.div>
        </div>
        </Section>
    );
}
