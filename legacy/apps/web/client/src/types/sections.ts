import type { TechTag } from '@/types'

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export type SkillItem = {
    _id?: string
    name: string
    level?: SkillLevel
    icon?: string
    description?: string
}

export type SkillCategory = {
    _id?: string
    title: string
    items: SkillItem[]
}

export type ExperienceItem = {
    _id?: string
    role: string
    company: string
    url?: string
    location?: string
    start: string           // e.g. "2024-06"
    end: string             // e.g. "Present" or "2025-02"
    description: string[]
    tags?: string[]
}
