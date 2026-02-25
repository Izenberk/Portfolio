"use client";

import { useLayoutEffect } from "react";

export default function ScrollToTopOnLoad() {
    useLayoutEffect(() => {
        try {
            if ("scrollRestoration" in window.history) {
                window.history.scrollRestoration = "manual";
            }
        } catch {/**/}

        if (window.location.hash) {
            const { pathname, search } = window.location;
            window.history.replaceState(null, "", pathname + search);
        }

        const snapTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        snapTop();
        requestAnimationFrame(snapTop);
    }, []);

    return null;
}
