"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui-blocks"

type Stage = "idle" | "loading" | "done"

const loadingSteps = [
  "Uploading photo...",
  "Reading facial proportions...",
  "Comparing likely face shapes...",
  "Generating haircut recommendations...",
]

const probabilities = [
  ["Square", 78],
  ["Oblong", 12],
  ["Oval", 6],
  ["Round", 4],
] as const

export function MockAnalysisFlow() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [stage, setStage] = useState<Stage>("idle")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [stepIndex, setStepIndex] = useState(0)

  const activeStep = loadingSteps[Math.min(stepIndex, loadingSteps.length - 1)]

  const helperText = useMemo(() => {
    if (stage === "idle") return "Use a clear, front-facing photo with visible forehead, cheekbones, and jawline."
    if (stage === "loading") return activeStep
    return "Analysis complete. Review your result and use the style recommendations below."
  }, [stage, activeStep])

  const startFakeAnalysis = () => {
    setStage("loading")
    setStepIndex(0)

    loadingSteps.forEach((_, index) => {
      window.setTimeout(() => setStepIndex(index), index * 900)
    })

    window.setTimeout(() => {
      setStage("done")
      setStepIndex(loadingSteps.length - 1)
    }, loadingSteps.length * 900 + 250)
  }

  const onPickFile = (file?: File) => {
    if (!file) return
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    const nextUrl = URL.createObjectURL(file)
    setPreviewUrl(nextUrl)
    startFakeAnalysis()
  }

  return (
    <div className="space-y-5">
      <Card className="min-h-[560px] border-emerald-500/20 bg-[linear-gradient(180deg,rgba(16,185,129,0.1),rgba(9,9,11,0.9))] p-0 overflow-hidden">
        <div className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-black/40 p-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-zinc-400">
            <span>Photo upload</span>
            <span className="text-emerald-300">{stage === "done" ? "Analysis complete" : stage === "loading" ? "Analyzing" : "Ready"}</span>
          </div>

          <div className="mt-6 flex flex-1 flex-col justify-center">
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 aspect-[4/5]">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="Uploaded face preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_35%),linear-gradient(180deg,#18181b,#09090b)] text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-5xl text-emerald-300">
                    ⌁
                  </div>
                  <p className="mt-6 text-2xl font-black uppercase text-white">Scan your face</p>
                  <p className="mt-2 max-w-xs text-sm leading-7 text-zinc-400">Drop in one clear selfie and preview the full result experience.</p>
                </div>
              )}

              {stage === "loading" ? (
                <div className="pointer-events-none absolute inset-0 bg-black/25">
                  <div className="scan-frame absolute inset-0" />
                </div>
              ) : null}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                {stage === "idle" ? "Ready to analyze" : stage === "loading" ? activeStep : "Result ready"}
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-400">{helperText}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
            >
              {previewUrl ? "Upload another photo" : "Upload photo"}
            </button>
            <Link
              href="/result-demo"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-100 transition hover:border-emerald-500/40 hover:text-emerald-300"
            >
              View example result
            </Link>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => onPickFile(event.target.files?.[0])}
            />
          </div>
        </div>
      </Card>

      {stage === "done" ? (
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="bg-[linear-gradient(180deg,rgba(16,185,129,0.12),rgba(9,9,11,0.92))]">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-zinc-400">
              <span>Analysis result</span>
              <span className="text-emerald-300">Square face</span>
            </div>
            <div className="mt-8 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-zinc-400">Most likely face shape</p>
              <p className="mt-2 text-4xl font-black uppercase text-white">Square</p>
              <p className="mt-3 text-sm text-zinc-400">Strong jawline, similar width through forehead and jaw, balanced face length.</p>
            </div>
            <div className="mt-8 space-y-3">
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
          </Card>

          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Why this result</p>
              <h3 className="mt-3 text-2xl font-black text-white">Your structure</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                Your jawline looks angular, your forehead is broad, and your face length appears balanced instead of obviously long.
              </p>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Best haircut direction</p>
              <h3 className="mt-3 text-2xl font-black text-white">Recommended</h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>• Textured crop</li>
                <li>• Angular quiff</li>
                <li>• Side part</li>
                <li>• Crew cut with lift</li>
              </ul>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-300">Usually avoid</p>
              <h3 className="mt-3 text-2xl font-black text-white">Less flattering</h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>• Flat boxy cuts</li>
                <li>• Heavy side bulk</li>
                <li>• Wide fringe that broadens the forehead</li>
              </ul>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Beard suggestion</p>
              <h3 className="mt-3 text-2xl font-black text-white">Best pairings</h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>• Heavy stubble</li>
                <li>• Short boxed beard</li>
                <li>• Clean full beard with controlled sides</li>
              </ul>
            </Card>
          </div>
        </div>
      ) : null}
    </div>
  )
}
