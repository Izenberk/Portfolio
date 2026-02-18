export type ExternalLink = {
    label: string
    href: string
    newTab?: boolean
    icon?: React.ReactNode
}

export type TechTag =
    | 'typescript'
    | 'javascript'
    | 'react'
    | 'vite'
    | 'tailwind'
    | 'node'
    | 'express'
    | 'mongodb'
    | 'shadcn'
    | 'vitest'

export type Project = {
    id: string
    title: string
    description: string
    cover?: string
    repoUrl?: string
    demoUrl?: string
    tech: TechTag[]
    highlights?: string[]
}

export type WithChildren<T = unknown> = T & { children?: React.ReactNode }