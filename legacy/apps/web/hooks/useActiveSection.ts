import { useEffect, useState } from 'react'
import type { SectionId } from '@/config/sections'

export function useActiveSection(ids: SectionId[]) {
    const [active, setActive] = useState<SectionId>(ids[0])

    useEffect(() => {
        const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el)

        if (sections.length === 0) return

        // Adjust top margin to your header height (~96px)
        const observer = new IntersectionObserver(
        (entries) => {
            // Pick the most visible intersecting section
            const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
            if (visible?.target?.id) setActive(visible.target.id as SectionId)
        },
        {
            root: null,
            rootMargin: '-96px 0px -40% 0px',
            threshold: [0.25, 0.5, 0.75, 1],
        }
        )

        sections.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [ids.join('|')])

    return active
}
