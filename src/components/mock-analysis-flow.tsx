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

  const frameHeight = compact ? "min-h-[520px] sm:min-h-[640px]" : "min-h-[500px] sm:min-h-[560px]"

  return (
    <div className="space-y-5">
      <Card className={`border-emerald-500/20 bg-[linear-gradient(180deg,rgba(16,185,129,0.1),rgba(9,9,11,0.9))] p-0 overflow-hidden ${frameHeight}`}>
        <div className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-black/40 p-4 sm:p-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-zinc-400">
            <span>Photo upload</span>
            <span className="text-emerald-300">{stage === "loading" ? "Analyzing" : "Ready"}</span>
          </div>

          <button
            type="button"
            onClick={() => stage === "idle" && inputRef.current?.click()}
            className="mt-4 flex flex-1 flex-col justify-center text-left sm:mt-6"
          >
            <div className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950 aspect-[4/5] transition hover:border-emerald-500/40 sm:max-w-sm sm:rounded-[2rem]">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="Uploaded face preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_35%),linear-gradient(180deg,#18181b,#09090b)] text-center px-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-4xl text-emerald-300 sm:h-24 sm:w-24 sm:text-5xl">
                    ⌁
                  </div>
                  <p className="mt-5 text-xl font-black uppercase text-white sm:mt-6 sm:text-2xl">Upload your photo</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-400 sm:leading-7">
                    Front-facing. Clear lighting. Forehead, cheekbones, and jaw visible.
                  </p>
                </div>
              )}

              {stage === "loading" ? (
                <div className="pointer-events-none absolute inset-0 z-10 bg-black/20">
                  <div className="absolute inset-2 rounded-[1.1rem] border border-emerald-400/40 sm:inset-3 sm:rounded-[1.4rem]" />
                  <div className="absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-emerald-300 sm:left-5 sm:top-5 sm:h-5 sm:w-5" />
                  <div className="absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-emerald-300 sm:right-5 sm:top-5 sm:h-5 sm:w-5" />
                  <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-emerald-300 sm:bottom-5 sm:left-5 sm:h-5 sm:w-5" />
                  <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-emerald-300 sm:bottom-5 sm:right-5 sm:h-5 sm:w-5" />
                  <div className="absolute inset-x-0 top-0 z-20 h-full overflow-hidden rounded-[2rem]">
                    <div className="scan-beam absolute left-0 right-0 top-[-12%] h-14" />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-5 text-center sm:mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300 sm:text-sm sm:tracking-[0.25em]">
                {stage === "idle" ? "Click to upload" : activeStep}
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400 sm:leading-7">{helperText}</p>
            </div>
          </button>

          <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-emerald-300 sm:w-auto sm:px-6 sm:tracking-[0.2em]"
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
