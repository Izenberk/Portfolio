import Section from "@/components/layout/Section"
import { Mail, Linkedin, Github } from "lucide-react"

const CONTACTS = [
    {
        id: "email",
        url: "mailto:Korn-aphichit.ng@outlook.com",
        icon: Mail,
        label: "Email",
    },
    {
        id: "linkedin",
        url: "https://www.linkedin.com/in/korn-aphichit-ngaopan/",
        icon: Linkedin,
        label: "LinkedIn",
    },
    {
        id: "github",
        url: "https://github.com/Izenberk",
        icon: Github,
        label: "GitHub",
    },
]

export default function ContactSection() {
    return (
        <Section id="contact" className="py-16 text-center">
        <h2 className="mb-6 text-3xl font-bold">Contact</h2>
        <p className="mb-10 max-w-prose mx-auto text-white/80">
            Get in touch via email or explore more of my work through the links below.
        </p>

        <div className="flex justify-center gap-8">
            {CONTACTS.map(({ id, url, icon: Icon, label }) => (
            <a
                key={id}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group rounded-full p-3 transition hover:bg-white/10"
            >
                <Icon className="h-8 w-8 text-white/70 group-hover:text-primary transition-colors" />
            </a>
            ))}
        </div>
        </Section>
    )
}
