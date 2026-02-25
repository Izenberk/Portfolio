"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === "/admin/login") {
      setAuthenticated(true);
      setChecked(true);
      return;
    }

    const token = localStorage.getItem("admin_token");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    // Check if token is expired by decoding the JWT payload
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("admin_token");
        window.location.href = "/admin/login";
        return;
      }
    } catch {
      localStorage.removeItem("admin_token");
      window.location.href = "/admin/login";
      return;
    }

    setAuthenticated(true);
    setChecked(true);
  }, [pathname]);

  if (!checked || !authenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
