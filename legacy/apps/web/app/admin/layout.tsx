'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // If we are already on the login page, we are good.
        if (pathname === '/admin/login') {
            setIsAuthorized(true);
            return;
        }

        // Check if we have a token in our pocket (localStorage)
        const token = localStorage.getItem('token');

        if (!token) {
            // No token? Go to login
            window.location.href = '/admin/login';
        } else {
            setIsAuthorized(true);
        }
    }, [pathname]);

    if (!isAuthorized) return null;

    // If on login page, just render children (no sidebar)
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Prevent flashing of admin content before auth check
    // if (!isAuthorized) return null; // Uncomment this when logic is added

    return (
        <div className="min-h-screen flex bg-background">
            {/* Sidebar - The "Boring" UI Part */}
            <aside className="w-64 border-r border-border bg-card p-6 flex flex-col">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <NavLink href="/admin/projects" active={pathname.includes('/projects')}>
                        Projects
                    </NavLink>
                    <NavLink href="/admin/skills" active={pathname.includes('/skills')}>
                        Skills
                    </NavLink>
                    <NavLink href="/admin/experience" active={pathname.includes('/experience')}>
                        Experience
                    </NavLink>
                </nav>

                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/admin/login';
                    }}
                    className="mt-auto flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors"
                >
                    <span>Log Out</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className={`block px-4 py-2 rounded-lg transition-colors ${active
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
        >
            {children}
        </Link>
    );
}
