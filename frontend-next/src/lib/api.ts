import { API_URL } from './config';
import type { Project } from '@/types/project';
import type { SkillCategory, ExperienceItem } from '@/types/sections';

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/api/projects`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function getSkills(): Promise<SkillCategory[]> {
  const res = await fetch(`${API_URL}/api/skills`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch skills');
  return res.json();
}

export async function getExperience(): Promise<ExperienceItem[]> {
  const res = await fetch(`${API_URL}/api/experience`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch experience');
  return res.json();
}

export async function postContact(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to send contact message');
}
