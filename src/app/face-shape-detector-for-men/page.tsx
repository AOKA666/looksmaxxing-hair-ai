import type { Metadata } from "next"
import { Card, Pill, PrimaryLink, Section, SecondaryLink } from "@/components/ui-blocks"

export const metadata: Metadata = {
  title: "Face Shape Detector for Men | Looksmaxxing Hair AI",
  description: "Upload a clear photo and get male-first haircut, beard, and glasses direction from AI-style face shape analysis.",
}

export default function DetectorPage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1fr_1fr] md:py-24">
        <div className="flex flex-col justify-center">
          <Pill>Detector page</Pill>
          <h1 className="mt-6 text-4xl font-black uppercase leading-tight text-white md:text-6xl">
            Face shape detector
            <br />
            for men.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Get a likely face shape, a better read on your proportions, and direct guidance for haircuts, beard lines,
            and frames.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryLink href="/result-demo">Preview the result UI</PrimaryLink>
            <SecondaryLink href="/mens-hairstyles-by-face-shape">See haircut recommendations</SecondaryLink>
          </div>
        </div>
        <Card className="scan-frame min-h-[540px] border-emerald-500/20 bg-[linear-gradient(180deg,rgba(16,185,129,0.1),rgba(9,9,11,0.9))]">
          <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-black/40 p-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-zinc-400">
              <span>Photo upload</span>
              <span className="text-emerald-300">Accuracy-first</span>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-5xl text-emerald-300">
                ⌁
              </div>
              <h2 className="mt-6 text-2xl font-black uppercase text-white">Scan your face</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-zinc-400">
                For the cleanest result, use a clear front-facing photo with visible forehead, cheekbones, and jawline.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                "Forehead visible",
                "Neutral head angle",
                "Strong lighting",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <Section eyebrow="Why this matters" title="The wrong classification ruins haircut advice fast." description="If you confuse oval with oblong or square with round, the whole recommendation layer gets weaker. That is why the upload step matters.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Likely primary shape", "The tool should show your main result, not just throw one label and disappear."],
            ["Close alternatives", "Good face shape analysis admits when two shapes are close instead of pretending certainty."],
            ["Actionable output", "The result should tell you what to do next with hair, beard, and styling."],
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
