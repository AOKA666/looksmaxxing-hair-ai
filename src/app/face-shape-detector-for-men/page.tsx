import type { Metadata } from "next"
import { Card, Pill, PrimaryLink, Section, SecondaryLink } from "@/components/ui-blocks"
import { MockAnalysisFlow } from "@/components/mock-analysis-flow"

export const metadata: Metadata = {
  title: "Face Shape Detector for Men | Looksmaxxing Hair AI",
  description: "Upload a clear photo and get haircut, beard, and glasses recommendations from face shape analysis designed for men.",
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
        <MockAnalysisFlow />
      </section>

      <Section eyebrow="Why this matters" title="The wrong classification ruins haircut advice fast." description="If you confuse oval with oblong or square with round, the whole recommendation layer gets weaker. That is why the upload step matters.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Your main result", "See the face shape that best matches your structure based on the photo you upload."],
            ["Similar face shapes", "If two shapes are close, you can compare them before deciding on a haircut."],
            ["What to do next", "Use the result to choose better hair, beard, and styling options."],
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
