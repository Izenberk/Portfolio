"use client"

import { useLayoutEffect } from "react";

export default function ScrollToTopOnLoad() {
    useLayoutEffect(() => {
        // 1) Stop the browser from restoring scroll
        try {
            if ("scrollRestoration" in window.history) {
                window.history.scrollRestoration = "manual";
            }
        } catch {/**/ }

        // 2) If URL has a hash (e.g., #projects), clear it so the browser doesn't jump
        if (window.location.hash) {
            const { pathname, search } = window.location;
            window.history.replaceState(null, "", pathname + search);
        }

        // 3) Force scroll to the very top (double-tap to beat late restorations)
        const snapTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        snapTop();
        requestAnimationFrame(snapTop); // handle browsers that restore after first paint

        // (Optional) On unmount, you can return scrollRestoration to 'auto'
        // return () => { window.history.scrollRestoration = "auto"; };
    }, []);

    return null;
}
