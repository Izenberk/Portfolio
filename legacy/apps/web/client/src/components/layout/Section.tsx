// src/components/layout/Section.tsx
import type { WithChildren } from '@/types'

type SectionProps = WithChildren<{
    id?: string
    className?: string
    containerClassName?: string
    }>

    export default function Section({
    id,
    className,
    containerClassName,
    children,
    }: SectionProps) {
    return (
        <section id={id} className={className}>
        <div className={`mx-auto w-full max-w-6xl px-6 ${containerClassName ?? ''}`}>
            {children}
        </div>
        </section>
    )
}
