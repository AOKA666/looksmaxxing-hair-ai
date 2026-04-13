"use client"

import { useEffect, useState } from "react"
import { Card, Pill, Section } from "@/components/ui-blocks"

const probabilities = [
  ["Square", 78],
  ["Oblong", 12],
  ["Oval", 6],
  ["Round", 4],
] as const

export function ResultView({ allowPreviewImage = false }: { allowPreviewImage?: boolean }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!allowPreviewImage || typeof window === "undefined") return
    const stored = window.sessionStorage.getItem("looksmaxxing-preview")
    if (stored) setPreviewUrl(stored)
  }, [allowPreviewImage])

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <Pill>Result</Pill>
        <h1 className="mt-6 text-4xl font-black uppercase text-white md:text-6xl">Example face shape result</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
          This preview shows how your result can explain your face shape and turn it into useful haircut and beard recommendations.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="min-h-[620px] bg-[linear-gradient(180deg,rgba(16,185,129,0.12),rgba(9,9,11,0.92))]">
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-black/40 p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-zinc-400">
                <span>Analysis</span>
                <span className="text-emerald-300">Complete</span>
              </div>
              <div className="text-center">
                <div className="mx-auto h-56 w-44 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.28),transparent_35%),linear-gradient(180deg,rgba(39,39,42,0.95),rgba(9,9,11,0.95))]">
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewUrl} alt="Analyzed face preview" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.35em] text-zinc-400">Likely face shape</p>
                <p className="mt-2 text-4xl font-black uppercase text-white">Square</p>
                <p className="mt-2 text-sm text-zinc-400">Strong jawline, broad forehead, balanced face length.</p>
              </div>
              <div className="space-y-3">
                {probabilities.map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-400">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-emerald-400" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Why this result</p>
              <h2 className="mt-3 text-2xl font-black text-white">Confidence context</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                Your jawline is angular, the forehead and jaw are similar in width, and the face length is balanced rather than obviously long.
              </p>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Haircut direction</p>
              <h2 className="mt-3 text-2xl font-black text-white">Recommended</h2>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>• Textured crop</li>
                <li>• Angular quiff</li>
                <li>• Side part</li>
                <li>• Crew cut with lift</li>
              </ul>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-300">Avoid list</p>
              <h2 className="mt-3 text-2xl font-black text-white">Usually skip</h2>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>• Flat boxy cuts</li>
                <li>• Heavy side bulk</li>
                <li>• Wide fringe that broadens the forehead</li>
              </ul>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Beard suggestions</p>
              <h2 className="mt-3 text-2xl font-black text-white">Pairing strategy</h2>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>• Heavy stubble for definition</li>
                <li>• Short boxed beard</li>
                <li>• Clean full beard without excess side bulk</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <Section eyebrow="Next steps" title="Use your result to choose a better style" description="After you get your face shape, the next step is simple: explore the haircut, beard, or comparison guide that fits you best.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Haircut guide", "Open the matching haircut guide for your face shape."],
            ["Beard guide", "See which beard shapes improve balance instead of hurting it."],
            ["Compare similar shapes", "If two face shapes look close, compare them before committing to a new cut."],
          ].map(([title, description]) => (
            <Card key={title}>
              <p className="text-lg font-bold text-white">{title}</p>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{description}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}
