"use client"

// src/sections/Hero.tsx
import { motion } from "framer-motion"
import { AuroraText } from "@/components/magicui/aurora-text"
import type { JSX } from "react"
import Section from "@/components/layout/Section"

export default function Hero(): JSX.Element {
    return (
        <Section id="home" className="relative pt-20 md:pt-28 min-h-[100dvh] overflow-hidden" containerClassName="max-w-5xl">
            <div className="grid gap-8 pt-4 justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-foreground/80 text-sm py-2 flex justify-center">
                        FULL-STACK ENGINEER • AUTOMATION ARCHITECT • DATA OPS
                    </span>

                    <motion.h1
                        className="text-3xl md:text-5xl text-center font-bold leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Engineering Scalable Systems & <br />
                        <AuroraText colors={["#18337D", "#2C5DE3"]}>
                            Intelligent Workflows
                        </AuroraText>
                    </motion.h1>

                    <motion.p
                        className="mt-4 text-foreground/80 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Hi, I'm Korn. I transform complex business requirements into streamlined digital solutions.
                        By fusing Full-Stack development with advanced automation, I build robust applications
                        and self-sustaining workflows that maximize efficiency and scalability.
                    </motion.p>

                    <motion.div
                        className="mt-6 flex gap-3 justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <a
                                href="#projects"
                                className="inline-flex items-center px-5 py-3 rounded-lg bg-primary text-primary-foreground cursor-pointer"
                            >
                                View Projects
                            </a>
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

                        <div className="flex flex-wrap justify-center gap-8 mt-10">
                            {/* 1. TypeScript */}
                            <div className="flex flex-col items-center text-center text-sm">
                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                                    alt="TypeScript"
                                    className="h-10 w-10"
                                />
                                <span className="mt-2 text-foreground/70">TypeScript</span>
                            </div>

                            {/* 2. Next.js */}
                            <div className="flex flex-col items-center text-center text-sm">
                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                                    alt="Next.js"
                                    className="h-10 w-10 invert dark:invert-0"
                                />
                                <span className="mt-2 text-foreground/70">Next.js</span>
                            </div>

                            {/* 3. NestJS */}
                            <div className="flex flex-col items-center text-center text-sm">
                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg"
                                    alt="NestJS"
                                    className="h-10 w-10"
                                />
                                <span className="mt-2 text-foreground/70">NestJS</span>
                            </div>

                            {/* 4. Node.js */}
                            <div className="flex flex-col items-center text-center text-sm">
                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                                    alt="Node.js"
                                    className="h-10 w-10"
                                />
                                <span className="mt-2 text-foreground/70">Node.js</span>
                            </div>

                            {/* 5. n8n */}
                            <div className="flex flex-col items-center text-center text-sm">
                                <img
                                    src="https://cdn.simpleicons.org/n8n/FF6584"
                                    alt="n8n"
                                    className="h-10 w-10"
                                />
                                <span className="mt-2 text-foreground/70">n8n</span>
                            </div>

                            {/* 6. Docker */}
                            <div className="flex flex-col items-center text-center text-sm">
                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                                    alt="Docker"
                                    className="h-10 w-10"
                                />
                                <span className="mt-2 text-foreground/70">Docker</span>
                            </div>

                            {/* 7. Linux */}
                            <div className="flex flex-col items-center text-center text-sm">
                                <img
                                    src="https://img.icons8.com/color/96/linux--v1.png"
                                    alt="Linux"
                                    className="h-10 w-10"
                                />
                                <span className="mt-2 text-foreground/70">Linux</span>
                            </div>

                            {/* 8. MongoDB */}
                            <div className="flex flex-col items-center text-center text-sm">
                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
                                    alt="MongoDB"
                                    className="h-10 w-10"
                                />
                                <span className="mt-2 text-foreground/70">MongoDB</span>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </Section>
    );
}
