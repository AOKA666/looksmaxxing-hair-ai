import Link from "next/link"
import type { ReactNode } from "react"

const nav = [
  { href: "/", label: "Home" },
  { href: "/face-shape-detector-for-men", label: "Detector" },
  { href: "/mens-hairstyles-by-face-shape", label: "Haircuts" },
  { href: "/beard-styles-by-face-shape", label: "Beards" },
  { href: "/blog", label: "Blog" },
]

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(52,211,153,0.08),transparent_20%)]" />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-lg font-black tracking-[0.2em] uppercase">
            <span className="text-emerald-400">Looksmaxxing</span> Hair AI
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-emerald-300">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/result-demo"
            className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 transition hover:bg-emerald-500/20"
          >
Example Result
          </Link>
        </div>
      </header>
      <main className="relative z-10">{children}</main>
      <footer className="relative z-10 border-t border-white/10 bg-black/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">Looksmaxxing Hair AI</p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-400">
              A face shape and grooming website for men who want better haircuts, beard styles, and style advice with more confidence.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-200">Main Pages</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-400">
              <Link href="/face-shape-detector-for-men">Face Shape Detector for Men</Link>
              <Link href="/mens-hairstyles-by-face-shape">Men&apos;s Hairstyles by Face Shape</Link>
              <Link href="/beard-styles-by-face-shape">Beard Styles by Face Shape</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-200">Popular Guides</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-400">
              <Link href="/blog/best-haircuts-for-square-face-men">Best Haircuts for Square Face Men</Link>
              <Link href="/blog/oval-vs-oblong-face-male">Oval vs Oblong Face Male</Link>
              <Link href="/blog/best-beard-styles-for-your-face-shape">Best Beard Styles for Your Face Shape</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
