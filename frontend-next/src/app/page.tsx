import { getProjects, getSkills, getExperience } from "@/lib/api";
import type { Project } from "@/types/project";
import type { SkillCategory, ExperienceItem } from "@/types/sections";
import Navbar from "@/components/layout/Navbar";
import ScrollToTopOnLoad from "@/components/layout/ScrollToTopOnLoad";
import Hero from "@/sections/Hero";
import AboutSection from "@/sections/About";
import SkillsSection from "@/sections/Skills";
import ProjectsSection from "@/sections/Projects";
import ExperienceSection from "@/sections/Experience";
import ContactSection from "@/sections/Contact";

export default async function Home() {
  let projects: Project[] = [];
  let skills: SkillCategory[] = [];
  let experience: ExperienceItem[] = [];

  try {
    [projects, skills, experience] = await Promise.all([
      getProjects().catch(() => [] as Project[]),
      getSkills().catch(() => [] as SkillCategory[]),
      getExperience().catch(() => [] as ExperienceItem[]),
    ]);
  } catch {
    // Go backend may be down — render with empty data
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <ScrollToTopOnLoad />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <SkillsSection data={skills} />
        <ProjectsSection data={projects} />
        <ExperienceSection data={experience} />
        <ContactSection />
      </main>
      <footer className="mt-20 border-t border-border/60 py-10 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} Korn. All rights reserved.
      </footer>
    </div>
  );
}
