import { SECTIONS } from '@/config/sections'
import { useActiveSection } from '@/hooks/useActiveSection'

export default function Navbar() {
    const active = useActiveSection(SECTIONS.map((s) => s.id))

    return (
        <header className="sticky top-0 z-50 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="#home" className="text-lg font-bold">Korn.dev</a>
            <nav className="flex items-center gap-6 text-sm">
            {SECTIONS.map(({ id, label }) => (
                <a
                key={id}
                href={`#${id}`}
                className={
                    active === id
                    ? 'text-white font-medium'
                    : 'text-white/80 hover:text-white'
                }
                >
                {label}
                </a>
            ))}
            </nav>
        </div>
        </header>
    )
}
