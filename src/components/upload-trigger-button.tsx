"use client"

export function UploadTriggerButton({ inputId, children }: { inputId: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => document.getElementById(inputId)?.click()}
      className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
    >
      {children}
    </button>
  )
}
