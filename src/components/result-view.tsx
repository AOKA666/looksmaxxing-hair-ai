"use client"

import { useEffect, useState } from "react"
import { Card, Pill, Section } from "@/components/ui-blocks"
import { fallbackAnalysis, normalizeAnalysisResult, type AnalysisResult } from "@/lib/analysis"

export function ResultView({ allowPreviewImage = false }: { allowPreviewImage?: boolean }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult>(fallbackAnalysis)

  useEffect(() => {
    if (typeof window === "undefined") return

    if (allowPreviewImage) {
      const storedPreview = window.sessionStorage.getItem("looksmaxxing-preview")
      if (storedPreview) setPreviewUrl(storedPreview)
    }

    const storedResult = window.sessionStorage.getItem("looksmaxxing-analysis")
    if (storedResult) {
      try {
        setResult(normalizeAnalysisResult(JSON.parse(storedResult)))
      } catch {
        setResult(fallbackAnalysis)
      }
    }
  }, [allowPreviewImage])

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <Pill>Result</Pill>
        <h1 className="mt-6 text-4xl font-black uppercase text-white md:text-6xl">Your face shape result</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
          Review your face shape analysis, understand your strongest features, and use the recommendations to choose a better haircut and beard style.
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
                <p className="mt-2 text-4xl font-black uppercase text-white">{result.face_shape}</p>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{result.face_analysis_text}</p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Jawline</p>
                  <p className="mt-2 text-lg font-black text-white">{result.jawline_sharpness}/10</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Cheekbones</p>
                  <p className="mt-2 text-lg font-black text-white">{result.cheekbone_prominence}/10</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Forehead</p>
                  <p className="mt-2 text-lg font-black text-white">{result.forehead_width}</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Best hairstyles</p>
              <h2 className="mt-3 text-2xl font-black text-white">Recommended</h2>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {result.best_hairstyles.map((style) => (
                  <li key={style}>• {style}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Tell your barber</p>
              <h2 className="mt-3 text-2xl font-black text-white">3 clear instructions</h2>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {result.barber_instructions.map((instruction) => (
                  <li key={instruction}>• {instruction}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Beard recommendation</p>
              <h2 className="mt-3 text-2xl font-black text-white">Strong add-on</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-300">{result.beard_recommendation}</p>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-300">Avoid styles</p>
              <h2 className="mt-3 text-2xl font-black text-white">Usually skip</h2>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {result.avoid_styles.map((style) => (
                  <li key={style}>• {style}</li>
                ))}
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
