import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Hero from '@/sections/Hero'
import SkillsSection from '@/sections/Skills'
import ProjectsSection from '@/sections/Projects'
import ExperienceSection from '@/sections/Experience'
import AboutSection from '@/sections/About'
import ContactSection from '@/sections/Contact'
import ScrollToTopOnLoad from './lib/scrollToTopOnLoad'
import { API_URL } from './config'

export default function App() {
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [experience, setExperience] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/api/skills`)
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.error("Failed to fetch skills", err));

    fetch(`${API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Failed to fetch projects", err));

    fetch(`${API_URL}/api/experience`)
      .then(res => res.json())
      .then(data => setExperience(data))
      .catch(err => console.error("Failed to fetch experience", err));
  }, []);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <ScrollToTopOnLoad />
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <SkillsSection data={skills} />
        <ProjectsSection data={projects} />
        <ExperienceSection data={experience} />
        <ContactSection />
      </main>
      <footer className="mt-20 border-t border-border/60 py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} Korn. All rights reserved.
      </footer>
    </div>
  )
}
