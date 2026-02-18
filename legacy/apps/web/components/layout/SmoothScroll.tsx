"use client"

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()
                const href = anchor.getAttribute('href')
                if (href && href !== '#') {
                    const target = document.querySelector(href)
                    if (target) {
                        lenis.scrollTo(target as HTMLElement)
                    }
                }
            })
        })

        return () => {
            lenis.destroy()
        }
    }, [])

    return null
}
