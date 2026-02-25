import Section from '@/components/layout/Section'
import { ExperienceItem } from '@/types/sections'

function formatRange(start: string, end?: string) {
    const startDate = new Date(start).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    const endDate = end ? new Date(end).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present';
    return `${startDate} – ${endDate}`;
}

export default function ExperienceSection({ data }: { data: ExperienceItem[] }) {
    if (!data) return null;

    return (
        <Section id="experience" className="py-16">
            <h2 className="mb-6 text-3xl font-bold">Experience</h2>
            <p className="mb-10 max-w-prose text-white/80">
                Highlights from projects and previous roles.
            </p>

            <div className="relative mx-auto max-w-3xl">
                {/* timeline line */}
                <div className="absolute left-3 top-0 h-full w-px bg-white/10 md:left-1/2" />

                <ul className="space-y-8">
                    {data.map((item, idx) => {
                        const isLeft = idx % 2 === 0
                        return (
                            <li key={item._id} className="relative md:grid md:grid-cols-2 md:gap-8">
                                {/* dot */}
                                <span
                                    className="absolute left-3 top-2 block h-3 w-3 -translate-x-1/2 rounded-full bg-primary md:left-1/2"
                                    aria-hidden
                                />
                                <div className={isLeft ? 'md:col-start-1' : 'md:col-start-2'}>
                                    <article className="rounded-2xl border border-border bg-card p-5">
                                        <header className="mb-2">
                                            <h3 className="text-lg font-semibold">
                                                {item.role}
                                            </h3>
                                            <div className="text-base font-medium text-white/90">
                                                {item.url ? (
                                                    <a
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-300 hover:underline"
                                                    >
                                                        {item.company}
                                                    </a>
                                                ) : (
                                                    <span>{item.company}</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-white/60">
                                                {formatRange(item.start, item.end)}
                                                {item.location ? ` · ${item.location}` : ''}
                                            </p>
                                        </header>
                                        <ul className="list-disc space-y-1 pl-5 text-sm text-white/85">
                                            {item.description.map((b, i) => (
                                                <li key={i}>{b}</li>
                                            ))}
                                        </ul>
                                        {item.tags?.length ? (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {item.tags.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="rounded-xl border border-white/15 bg-accent/50 px-2 py-1 text-xs"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : null}
                                    </article>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Section>
    )
}
