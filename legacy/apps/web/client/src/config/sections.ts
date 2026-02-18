export const SECTIONS = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills'},
    { id: 'contact', label: 'Contact' },
] as const

export type SectionId = typeof SECTIONS[number]['id']
