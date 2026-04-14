"use client"

import { useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui-blocks"
import { fallbackAnalysis } from "@/lib/analysis"

type Stage = "idle" | "loading"

const loadingSteps = [
  "Uploading photo...",
  "Reading facial proportions...",
  "Comparing likely face shapes...",
  "Generating haircut recommendations...",
]

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error("Failed to read image file"))
    reader.readAsDataURL(file)
  })
}

export function MockAnalysisFlow({ compact = false, inputId = "upload-input" }: { compact?: boolean; inputId?: string }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [stage, setStage] = useState<Stage>("idle")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const activeStep = loadingSteps[Math.min(stepIndex, loadingSteps.length - 1)]

  const helperText = useMemo(() => {
    if (error) return error
    if (stage === "idle") return "Use a clear, front-facing photo with visible forehead, cheekbones, and jawline."
    return activeStep
  }, [stage, activeStep, error])

  const startVisualProgress = () => {
    setStage("loading")
    setStepIndex(0)

    loadingSteps.forEach((_, index) => {
      window.setTimeout(() => setStepIndex(index), index * 900)
    })
  }

  const onPickFile = async (file?: File) => {
    if (!file) return
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setError(null)

    const localPreviewUrl = URL.createObjectURL(file)
    setPreviewUrl(localPreviewUrl)
    startVisualProgress()

    try {
      const imageDataUrl = await fileToDataUrl(file)
      window.sessionStorage.setItem("looksmaxxing-preview", localPreviewUrl)

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageDataUrl }),
      })

      const payload = await response.json()

      if (!response.ok || !payload?.result) {
        throw new Error(payload?.error || "Analysis failed")
      }

      window.sessionStorage.setItem("looksmaxxing-analysis", JSON.stringify(payload.result))
      router.push("/result")
    } catch (err) {
      window.sessionStorage.setItem("looksmaxxing-analysis", JSON.stringify(fallbackAnalysis))
      setStage("idle")
      setStepIndex(0)
      setError(err instanceof Error ? err.message : "Analysis failed")
    }
  }

  const frameHeight = compact ? "min-h-[640px]" : "min-h-[560px]"

  return (
    <div className="space-y-5">
      <Card className={`border-emerald-500/20 bg-[linear-gradient(180deg,rgba(16,185,129,0.1),rgba(9,9,11,0.9))] p-0 overflow-hidden ${frameHeight}`}>
        <div className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-black/40 p-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-zinc-400">
            <span>Photo upload</span>
            <span className="text-emerald-300">{stage === "loading" ? "Analyzing" : "Ready"}</span>
          </div>

          <button
            type="button"
            onClick={() => stage === "idle" && inputRef.current?.click()}
            className="mt-6 flex flex-1 flex-col justify-center text-left"
          >
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 aspect-[4/5] transition hover:border-emerald-500/40">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="Uploaded face preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_35%),linear-gradient(180deg,#18181b,#09090b)] text-center px-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-5xl text-emerald-300">
                    ⌁
                  </div>
                  <p className="mt-6 text-2xl font-black uppercase text-white">Upload your photo</p>
                  <p className="mt-2 max-w-xs text-sm leading-7 text-zinc-400">
                    Front-facing. Clear lighting. Forehead, cheekbones, and jaw visible.
                  </p>
                </div>
              )}

              {stage === "loading" ? (
                <div className="pointer-events-none absolute inset-0 z-10 bg-black/20">
                  <div className="absolute inset-3 rounded-[1.4rem] border border-emerald-400/40" />
                  <div className="absolute left-5 top-5 h-5 w-5 border-l-2 border-t-2 border-emerald-300" />
                  <div className="absolute right-5 top-5 h-5 w-5 border-r-2 border-t-2 border-emerald-300" />
                  <div className="absolute bottom-5 left-5 h-5 w-5 border-b-2 border-l-2 border-emerald-300" />
                  <div className="absolute bottom-5 right-5 h-5 w-5 border-b-2 border-r-2 border-emerald-300" />
                  <div className="absolute inset-x-0 top-0 z-20 h-full overflow-hidden rounded-[2rem]">
                    <div className="scan-beam absolute left-0 right-0 top-[-12%] h-14" />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                {stage === "idle" ? "Click to upload" : activeStep}
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-400">{helperText}</p>
            </div>
          </button>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
            >
              {previewUrl ? "Replace photo" : "Upload photo"}
            </button>
            <input
              id={inputId}
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => onPickFile(event.target.files?.[0])}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
