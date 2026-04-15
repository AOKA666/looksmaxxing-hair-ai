import type { Metadata } from "next"
import Link from "next/link"
import { Card, Section } from "@/components/ui-blocks"
import { siteImages } from "@/lib/assets"
import { faceShapeCards } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Men's Hairstyles by Face Shape | Looksmaxxing Hair AI",
  description: "Compare haircut direction for square, oval, oblong, and round face shapes for men.",
}

const faceShapeImageMap = {
  Square: siteImages.faceShapes.square,
  Oval: siteImages.faceShapes.oval,
  Oblong: siteImages.faceShapes.oblong,
  Round: siteImages.faceShapes.round,
} as const

export default function MensHaircutsPage() {
  return (
    <Section eyebrow="Haircuts" title="Men's hairstyles by face shape" description="Use face shape to choose haircuts that balance your features and suit your proportions.">
      <div className="grid gap-5 lg:grid-cols-2">
        {faceShapeCards.map((card) => (
          <Card key={card.name} className="overflow-hidden p-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={faceShapeImageMap[card.name as keyof typeof faceShapeImageMap]}
              alt={`${card.name} face shape male portrait`}
              className="h-72 w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-black text-white">{card.name} face</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{card.summary}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Usually works</p>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    {card.best.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-300">Usually avoid</p>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    {card.avoid.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/blog/best-haircuts-for-square-face-men" className="text-sm font-semibold text-emerald-300">Best Haircuts for Square Face Men →</Link>
        <Link href="/blog/oval-vs-oblong-face-male" className="text-sm font-semibold text-emerald-300">Oval vs Oblong Face Male →</Link>
      </div>
    </Section>
  )
}
