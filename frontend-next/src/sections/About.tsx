"use client";

import { motion } from 'framer-motion'
import Section from '@/components/layout/Section'
import type { JSX } from 'react'

export default function AboutSection(): JSX.Element {
  return (
    <Section id="about" className="py-16 md:py-24" containerClassName="max-w-4xl md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-2xl md:text-3xl font-semibold">About Me</h2>
        <p className="text-foreground/80 leading-relaxed">
          I&apos;m <span className="font-medium text-primary">Korn-aphichit Ngaopan</span>, an{' '}
          <span className="font-medium text-primary">AI Automation Architect</span> and{' '}
          <span className="font-medium text-primary">Full-Stack Developer</span>. Transitioning from{' '}
          <span className="font-medium text-primary">financial trading and data engineering</span>, I now architect{' '}
          <span className="font-medium text-primary">agentic workflows</span> and scalable applications with a focus on
          system integrity and clean code.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          I prioritize <span className="font-medium text-primary">production-level design</span> — SOLID principles,
          robust error handling, and security in every project. My background in{' '}
          <span className="font-medium text-primary">PySpark, SQL, and Airflow</span> helps me build data-aware
          applications, while my current focus is on{' '}
          <span className="font-medium text-primary">Go backend services</span>,{' '}
          <span className="font-medium text-primary">Kubernetes orchestration</span>, and building{' '}
          <span className="font-medium text-primary">autonomous AI agents</span> using n8n and MCP.
        </p>
      </motion.div>
    </Section>
  )
}
