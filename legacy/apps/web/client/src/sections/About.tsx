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
        <p className="text-foreground/80 leading-relaxed">
          I’m <span className="font-medium text-primary">Korn-aphichit Ngaopan</span>, a former derivatives trader now
          pursuing a career as a <span className="font-medium text-primary">full-stack developer</span>. My years in
          finance sharpened my <span className="font-medium text-primary">detail-oriented mindset</span> and{' '}
          <span className="font-medium text-primary">analytical thinking</span> — skills I now carry into software
          development.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          My programming journey began with <span className="font-medium text-primary">self-motivated learning</span>,
          starting with Python in university and later advanced programming during my Master’s. After realizing I was
          more inspired by building systems than following markets, I joined Generation Thailand’s Junior Software
          Developer Bootcamp. Today, I focus on building <span className="font-medium text-primary">responsive UIs</span>,{' '}
          <span className="font-medium text-primary">clean APIs</span>, and{' '}
          <span className="font-medium text-primary">scalable solutions</span>, while continuing to explore my interests in{' '}
          <span className="font-medium text-primary">data</span> and{' '}
          <span className="font-medium text-primary">cybersecurity</span>.
        </p>
      </motion.div>
    </Section>
  )
}
