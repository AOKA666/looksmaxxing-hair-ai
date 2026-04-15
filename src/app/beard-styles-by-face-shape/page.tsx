import type { Metadata } from "next"
import { Card, Section } from "@/components/ui-blocks"
import { siteImages } from "@/lib/assets"

export const metadata: Metadata = {
  title: "Beard Styles by Face Shape | Looksmaxxing Hair AI",
  description: "Use beard width, outline, and length to improve lower-face balance and jaw definition.",
}

const beardRows = [
  ["Square", "Heavy stubble, short boxed beard, tidy full beard", "Ultra-boxy heavy beard with too much side bulk"],
  ["Oval", "Short boxed beard, heavy stubble, neat full beard", "Long pointed beard that over-elongates the face"],
  ["Oblong", "Short beard with width, controlled stubble", "Long chin-heavy beard or vertical goatee"],
  ["Round", "Angular boxed beard, chin-focused shape", "Big cheek-heavy beard that adds extra width"],
]

export default function BeardPage() {
  return (
    <Section eyebrow="Beards" title="Beard styles by face shape" description="Beard shape changes jaw definition, chin length, and lower-face balance. Choose a style that improves your overall proportions.">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="overflow-hidden p-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteImages.beardHero}
            alt="Premium beard styles hero for men"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </Card>
        <div className="grid gap-5 md:grid-cols-2">
          {beardRows.map(([shape, good, bad]) => (
            <Card key={shape}>
              <h2 className="text-2xl font-black text-white">{shape} face</h2>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Usually works</p>
              <p className="mt-2 text-sm leading-7 text-zinc-300">{good}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-rose-300">Usually avoid</p>
              <p className="mt-2 text-sm leading-7 text-zinc-300">{bad}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
