import { getProjects, getSkills, getExperience } from "@/lib/api";
import { API_URL } from "@/lib/config";
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
  console.log(`[DataSections] API_URL = ${API_URL}`);

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[DataSections] attempt ${attempt + 1}/${MAX_RETRIES + 1}`);
      const [projects, skills, experience] = await Promise.all([
        getProjects(),
        getSkills(),
        getExperience(),
      ]);

      console.log(`[DataSections] fetched: ${projects.length} projects, ${skills.length} skills, ${experience.length} experience`);

      // Backend responded — return data
      if (projects.length || skills.length || experience.length) {
        return [projects, skills, experience];
      }
    } catch (err) {
      console.error(`[DataSections] attempt ${attempt + 1} failed:`, err instanceof Error ? err.message : err);
    }

    // Don't sleep after the last attempt
    if (attempt < MAX_RETRIES) {
      await sleep(RETRY_DELAY);
    }
  }

  // All retries exhausted — render with empty data
  console.warn("[DataSections] all retries exhausted, rendering empty");
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
