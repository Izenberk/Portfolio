"use client"

// src/sections/About.tsx
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
        <div className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
          <p className="mb-6">
            I’m <span className="text-[#2C5DE3] font-semibold">Korn-aphichit Ngaopan</span>, a{' '}
            <span className="text-[#2C5DE3] font-semibold">Full-Stack Developer</span> with a specialized focus on{' '}
            <span className="text-[#2C5DE3] font-semibold">Backend Engineering</span>.
          </p>
          <p className="mb-6">
            My background as a <span className="text-[#2C5DE3] font-semibold">Derivatives Trader</span> gave me a{' '}
            <span className="text-[#2C5DE3] font-semibold">logical, data-driven mindset</span>, but my programming journey began with{' '}
            <span className="text-[#2C5DE3] font-semibold">self-motivated learning</span>. I realized I had a deep passion for technology and a{' '}
            <span className="text-[#2C5DE3] font-semibold">growth mindset</span> that craved new challenges.
          </p>
          <p>
            Today, that passion for learning drives my development. I design{' '}
            <span className="text-[#2C5DE3] font-semibold">scalable backend architectures</span>, treating{' '}
            <span className="text-[#2C5DE3] font-semibold">workflow automation (n8n)</span> as a strategic layer alongside{' '}
            <span className="text-[#2C5DE3] font-semibold">Node.js</span> and{' '}
            <span className="text-[#2C5DE3] font-semibold">NestJS</span>. Whether I’m architecting a new microservice or optimizing a legacy pipeline, I bring precision and performance to every line of code.
          </p>
        </div>
      </motion.div>
    </Section>
  )
}
