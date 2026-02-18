import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

// tiny helper so long lists don’t wrap messily on small screens
function TechChips({ items }: { items: string[] }) {
    return (
        <div className="flex flex-wrap gap-1.5">
        {items.slice(0, 8).map((t) => (
            <Badge
            key={t}
            variant="secondary"
            className="rounded-full px-2 py-0.5 text-[11px] font-medium"
            >
            {t}
            </Badge>
        ))}
        </div>
    );
}

export default function ProjectCard({
    p,
    featured = false,
    }: {
    p: Project;
    featured?: boolean;
    }) {
    return (
        <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.35 }}
        className="group"
        >
        <Card
            className={[
            "overflow-hidden border-muted/50",
            featured ? "shadow-lg" : "",
            ].join(" ")}
        >
            {/* Media header */}
            <div className="relative">
            {/* aspect controls height nicely; tweak for your screenshot shape */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-muted/40">
                {/* If you’re importing images via Vite, you can replace src with an import */}
                <img
                src={p.image}
                alt={`${p.title} cover`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
            </div>

            {/* gradient veil for text legibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            </div>

            <CardContent className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                    {p.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
                </div>
                {/* optional “solo/team” tag */}
                <Badge variant="outline" className="shrink-0">
                {p.contributors}
                </Badge>
            </div>

            {/* details bullets – keep to 2–3 lines for tightness */}
            <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
                {p.details.slice(0, 3).map((d, i) => (
                <li key={i} className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 translate-y-1 rounded-full bg-primary/70" />
                    <span>{d}</span>
                </li>
                ))}
            </ul>

            {/* stack */}
            <div className="mt-4">
                <TechChips items={p.stack} />
            </div>

            {/* actions */}
            <div className="mt-5 flex flex-wrap gap-2">
                <Button
                asChild
                className="transition-transform group-hover:translate-x-[0.5px]"
                >
                <a href={p.links.demo} target="_blank" rel="noreferrer">
                    Live Demo
                    <ExternalLink className="ml-2 h-4 w-4" />
                </a>
                </Button>
                <Button asChild variant="secondary">
                <a href={p.links.repo} target="_blank" rel="noreferrer">
                    Source
                    <Github className="ml-2 h-4 w-4" />
                </a>
                </Button>
            </div>
            </CardContent>
        </Card>
        </motion.div>
    );
}
