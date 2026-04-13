import Link from "next/link"
import type { ReactNode } from "react"

export function Section({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
      <div className="max-w-3xl">
        {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-400">{eyebrow}</p> : null}
        <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
        {description ? <p className="mt-4 text-base leading-8 text-zinc-400 md:text-lg">{description}</p> : null}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  )
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] ${className}`}>
      {children}
    </div>
  )
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
      {children}
    </span>
  )
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
    >
      {children}
    </Link>
  )
}

export function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-100 transition hover:border-emerald-500/40 hover:text-emerald-300"
    >
      {children}
    </Link>
  )
}
