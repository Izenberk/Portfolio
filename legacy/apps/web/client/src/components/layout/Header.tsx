import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import {
    Home,
    User,
    Code,
    Briefcase,
    Mail,
    LucideIcon,
    BookOpenCheck,
} from "lucide-react";

type NavItem = {
    id: string;
    label: string;
    icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "experience", label: "Experience", icon: BookOpenCheck },
    { id: "contact", label: "Contact", icon: Mail },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2
                    flex gap-6 rounded-2xl px-6 py-3 shadow-lg
                    border border-[var(--border)] text-white
                    transition-colors duration-300"
        style={{
            background: scrolled
            ? "linear-gradient(90deg, rgba(24,51,125,0.8) 0%, rgba(44,93,227,0.8) 100%)"
            : "linear-gradient(90deg, #18337D 0%, #2C5DE3 100%)",
        }}
        >
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <Link
            key={id}
            activeClass="active"
            to={id}
            spy={true}
            smooth={true}
            offset={-80} // adjust for header height
            duration={800}
            className="flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-110"
            >
            <Icon className="h-6 w-6 text-white" />
            <span className="mt-1 hidden text-xs sm:block text-white/90">
                {label}
            </span>
            </Link>
        ))}
        </nav>
    );
}
