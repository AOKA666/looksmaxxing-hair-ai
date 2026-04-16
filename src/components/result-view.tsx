"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, Pill, Section } from "@/components/ui-blocks"
import { fallbackAnalysis, normalizeAnalysisResult, type AnalysisResult } from "@/lib/analysis"

function MetricsBars({ result }: { result: AnalysisResult }) {
  const foreheadScore = result.forehead_width === "Wide" ? 8 : result.forehead_width === "Medium" ? 6 : 4
  const metrics = [
    { label: "Jawline", value: result.jawline_sharpness },
    { label: "Cheekbones", value: result.cheekbone_prominence },
    { label: "Forehead", value: foreheadScore, suffix: result.forehead_width },
  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Face metrics</p>
      <div className="mt-4 space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-zinc-400">
              <span>{metric.label}</span>
              <span className="font-bold text-zinc-200">{metric.suffix ? `${metric.value}/10 · ${metric.suffix}` : `${metric.value}/10`}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,rgba(16,185,129,0.55),rgba(52,211,153,1))] shadow-[0_0_18px_rgba(16,185,129,0.35)]"
                style={{ width: `${metric.value * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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

  const resultTitle = useMemo(() => `${result.face_shape} Face Shape`, [result.face_shape])

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 sm:py-16 md:py-24">
        <Pill>Result</Pill>
        <h1 className="mt-5 text-3xl font-black uppercase text-white sm:mt-6 sm:text-4xl md:text-6xl">Your face shape result</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400 sm:mt-5 sm:text-lg sm:leading-8">
          Review your face shape analysis, understand your strongest features, and use the recommendations to choose a better haircut and beard style.
        </p>
        <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="min-h-[560px] sm:min-h-[620px] bg-[linear-gradient(180deg,rgba(16,185,129,0.12),rgba(9,9,11,0.92))]">
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-black/40 p-4 sm:p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-zinc-400">
                <span>Analysis</span>
                <span className="text-emerald-300">Complete</span>
              </div>
              <div className="text-center">
                <div className="mx-auto h-48 w-36 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.28),transparent_35%),linear-gradient(180deg,rgba(39,39,42,0.95),rgba(9,9,11,0.95))] sm:h-56 sm:w-44 sm:rounded-[2rem]">
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewUrl} alt="Analyzed face preview" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400 sm:mt-6 sm:text-xs sm:tracking-[0.35em]">Likely face shape</p>
                <p className="mt-2 text-3xl font-black uppercase text-white sm:text-4xl">{resultTitle}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-400 sm:leading-7">{result.face_analysis_text}</p>
              </div>
              <div className="mt-8">
                <MetricsBars result={result} />
              </div>
            </div>
          </Card>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <Card>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400 sm:text-xs sm:tracking-[0.25em]">Best hairstyles</p>
              <h2 className="mt-3 text-xl font-black text-white sm:text-2xl">Recommended</h2>
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
