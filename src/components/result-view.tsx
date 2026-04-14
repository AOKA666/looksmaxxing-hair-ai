"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, Pill, Section } from "@/components/ui-blocks"
import { fallbackAnalysis, normalizeAnalysisResult, type AnalysisResult } from "@/lib/analysis"

function polarPoint(cx: number, cy: number, radius: number, angleDeg: number) {
  const angle = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  }
}

function RadarChart({ result }: { result: AnalysisResult }) {
  const foreheadScore = result.forehead_width === "Wide" ? 8 : result.forehead_width === "Medium" ? 6 : 4
  const metrics = [
    { label: "Jawline", value: result.jawline_sharpness, angle: 270 },
    { label: "Cheekbones", value: result.cheekbone_prominence, angle: 30 },
    { label: "Forehead", value: foreheadScore, angle: 150 },
  ]

  const cx = 120
  const cy = 120
  const maxR = 78
  const rings = [0.25, 0.5, 0.75, 1]

  const polygon = metrics
    .map((metric) => {
      const point = polarPoint(cx, cy, (metric.value / 10) * maxR, metric.angle)
      return `${point.x},${point.y}`
    })
    .join(" ")

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Face metrics</p>
      <div className="mt-3 flex flex-col items-center">
        <svg viewBox="0 0 240 240" className="h-56 w-56">
          {rings.map((ring) => {
            const points = metrics
              .map((metric) => {
                const point = polarPoint(cx, cy, maxR * ring, metric.angle)
                return `${point.x},${point.y}`
              })
              .join(" ")
            return <polygon key={ring} points={points} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          })}

          {metrics.map((metric) => {
            const end = polarPoint(cx, cy, maxR, metric.angle)
            return <line key={metric.label} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          })}

          <polygon points={polygon} fill="rgba(16,185,129,0.22)" stroke="rgba(52,211,153,0.95)" strokeWidth="2" />

          {metrics.map((metric) => {
            const point = polarPoint(cx, cy, (metric.value / 10) * maxR, metric.angle)
            return <circle key={metric.label} cx={point.x} cy={point.y} r="4" fill="rgb(110,231,183)" />
          })}
        </svg>
        <div className="mt-2 grid w-full grid-cols-3 gap-2 text-center">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">{metric.label}</p>
              <p className="mt-1 text-sm font-black text-white">{metric.value}/10</p>
            </div>
          ))}
        </div>
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
                <p className="mt-2 text-4xl font-black uppercase text-white">{resultTitle}</p>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{result.face_analysis_text}</p>
              </div>
              <div className="mt-8">
                <RadarChart result={result} />
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
