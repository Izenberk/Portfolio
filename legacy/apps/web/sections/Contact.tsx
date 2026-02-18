"use client"

import { useState } from "react"
import Section from "@/components/layout/Section"
import { Mail, Linkedin, Github, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error("Failed to send message")

            setStatus("success")
            setFormData({ name: "", email: "", message: "" })
        } catch (error) {
            console.error(error)
            setStatus("error")
        }
    }

    return (
        <Section id="contact" className="py-16">
            <div className="mx-auto max-w-4xl">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold">Contact</h2>
                    <p className="mx-auto max-w-prose text-muted-foreground">
                        Get in touch via email or explore more of my work through the links below.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2 items-start">
                    {/* Contact Links (Restored to original style) */}
                    <div className="flex flex-col justify-center gap-8">
                        <div className="text-left">
                            <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                            <p className="text-muted-foreground mb-6">
                                Feel free to reach out for collaborations or just a friendly hello.
                            </p>
                            <div className="flex gap-6">
                                {CONTACTS.map(({ id, url, icon: Icon, label }) => (
                                    <a
                                        key={id}
                                        href={url}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={label}
                                        className="group rounded-full p-3 bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                                    >
                                        <Icon className="h-6 w-6 text-white/70 group-hover:text-primary transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        required
                                        type="text"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        disabled={status === "loading" || status === "success"}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        required
                                        type="email"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={status === "loading" || status === "success"}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        required
                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="How can I help you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        disabled={status === "loading" || status === "success"}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={status === "loading" || status === "success"}
                                >
                                    {status === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {status === "success" && <CheckCircle className="mr-2 h-4 w-4" />}
                                    {status === "error" && <AlertCircle className="mr-2 h-4 w-4" />}
                                    {status === "idle" ? "Send Message" : status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Try Again"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Section>
    )
}
