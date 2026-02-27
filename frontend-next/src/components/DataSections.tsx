import { getProjects, getSkills, getExperience } from "@/lib/api";
import type { Project } from "@/types/project";
import type { SkillCategory, ExperienceItem } from "@/types/sections";
import SkillsSection from "@/sections/Skills";
import ProjectsSection from "@/sections/Projects";
import ExperienceSection from "@/sections/Experience";

const MAX_RETRIES = 20; // ~60s total with 3s intervals
const RETRY_DELAY = 3000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(): Promise<
  [Project[], SkillCategory[], ExperienceItem[]]
> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const [projects, skills, experience] = await Promise.all([
        getProjects(),
        getSkills(),
        getExperience(),
      ]);

      // Backend responded — return data
      if (projects.length || skills.length || experience.length) {
        return [projects, skills, experience];
      }
    } catch {
      // Backend not ready yet
    }

    // Don't sleep after the last attempt
    if (attempt < MAX_RETRIES) {
      await sleep(RETRY_DELAY);
    }
  }

  // All retries exhausted — render with empty data
  return [[], [], []];
}

export default async function DataSections() {
  const [projects, skills, experience] = await fetchWithRetry();

  return (
    <>
      <SkillsSection data={skills} />
      <ProjectsSection data={projects} />
      <ExperienceSection data={experience} />
    </>
  );
}
