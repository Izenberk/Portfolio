// src/components/common/ButtonLink.tsx
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { Link as ScrollLink } from "react-scroll"

type Variant = "primary" | "outline" | "ghost"
type Size = "sm" | "md" | "lg"

type BaseProps = {
    variant?: Variant
    size?: Size
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    fullWidth?: boolean
    loading?: boolean
    disabled?: boolean
    className?: string
    children?: ReactNode
    "aria-label"?: string
}

/** Use for external links or hashes like "#projects" */
type AnchorProps = Omit<ComponentPropsWithoutRef<"a">, "className" | "children"> & {
    href: string
}

/** Use for single-page section scroll */
type ScrollProps = {
    toSection: string
    offset?: number
    duration?: number
    smooth?: boolean
    spy?: boolean
    hashSpy?: boolean
}

type Props = BaseProps & (AnchorProps | ScrollProps)

function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ")
}

function variantClasses(variant: Variant = "primary") {
    const base =
        "inline-flex items-center justify-center rounded-2xl font-medium transition-colors " +
        "focus:outline-none focus-visible:ring focus-visible:ring-ring/50 " +
        "disabled:opacity-60 disabled:pointer-events-none"
    const map: Record<Variant, string> = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-border bg-transparent text-foreground hover:bg-white/5",
        ghost: "bg-transparent text-foreground hover:bg-white/10",
    }
    return cx(base, map[variant])
}

function sizeClasses(size: Size = "md") {
    const map: Record<Size, string> = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
    }
    return map[size]
}

const Spinner = () => (
    <svg className="mr-2 inline h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z" />
    </svg>
)

export default function ButtonLink(props: Props) {
    const {
        variant = "primary",
        size = "md",
        leftIcon,
        rightIcon,
        fullWidth,
        loading,
        disabled,
        className,
        children,
        ...rest
    } = props as Props

    const classes = cx(variantClasses(variant), sizeClasses(size), fullWidth && "w-full", className)
    const content = (
        <>
        {loading && <Spinner />}
        {leftIcon && !loading && <span className="mr-2 inline-flex">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
        </>
    )

    const isInactive = loading || disabled

    // Scroll-to-section mode
    if ("toSection" in rest) {
        const { toSection, offset = -80, duration = 600, smooth = true, spy = true, hashSpy = true } = rest
        // When disabled, render a non-interactive span for consistent layout
        if (isInactive) {
        return (
            <span className={classes} aria-disabled="true">
            {content}
            </span>
        )
        }
        return (
        <ScrollLink
            to={toSection}
            smooth={smooth}
            duration={duration}
            offset={offset}
            spy={spy}
            hashSpy={hashSpy}
            className={classes}
            aria-label={(props as BaseProps)["aria-label"]}
        >
            {content}
        </ScrollLink>
        )
    }

    // Anchor mode
    const { href, ...aProps } = rest as AnchorProps
    return (
        <a
        href={href}
        className={classes}
        aria-busy={loading || undefined}
        aria-disabled={isInactive ? true : undefined}
        {...aProps}
        onClick={(e) => {
            if (isInactive) e.preventDefault()
            aProps.onClick?.(e)
        }}
        >
        {content}
        </a>
    )
}
