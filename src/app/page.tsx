import Link from "next/link"
import { Card, Pill, PrimaryLink, Section, SecondaryLink } from "@/components/ui-blocks"
import { faceShapeCards, blogPosts } from "@/lib/site-data"

const features = [
  ["Face shape read", "Get a likely face shape plus close alternatives instead of one blind label."],
  ["Haircut strategy", "See what cuts add balance, reduce width, or avoid extra length."],
  ["Beard guidance", "Use beard shape to sharpen the jawline or stop your face looking longer."],
  ["Looksmaxxing angle", "Built for men who care about proportions, not vague beauty-blog fluff."],
]

const steps = [
  "Upload a clear, front-facing photo.",
  "Review your likely face shape and close alternatives.",
  "Get haircut, beard, and style direction built around your structure.",
]

export default function HomePage() {
  return (
    <>
      <section className="grid-noise mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
        <div className="flex flex-col justify-center">
          <Pill>The ultimate looksmaxxing tool</Pill>
          <h1 className="mt-6 text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl">
            Stop guessing.
            <br />
            Start <span className="text-emerald-400">winning.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Looksmaxxing Hair AI is a male-first face shape and grooming tool built to turn one selfie into
            stronger haircut, beard, and glasses decisions.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryLink href="/face-shape-detector-for-men">Scan your face</PrimaryLink>
            <SecondaryLink href="/result-demo">See a demo result</SecondaryLink>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-4 text-sm text-zinc-400 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-black text-white">4s</p>
              <p>Fast AI-style visual diagnosis</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">Male-first</p>
              <p>Designed around hair, beard, and frame decisions for men</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">Actionable</p>
              <p>Not just a label. You get what to do next.</p>
            </div>
          </div>
        </div>

        <Card className="relative overflow-hidden p-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent" />
          <div className="scan-frame relative aspect-[4/5] rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_38%),linear-gradient(180deg,#18181b,#09090b)] p-6">
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-zinc-400">
                <span>Scan module</span>
                <span className="text-emerald-300">Online</span>
              </div>
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-4xl">
                  ◎
                </div>
                <div>
                  <p className="text-2xl font-black uppercase text-white">Scan your face</p>
                  <p className="mt-2 text-sm text-zinc-400">Front-facing. Clear lighting. Forehead, cheekbones, and jaw visible.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-3/4 rounded-full bg-emerald-400" />
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-xs uppercase tracking-[0.2em] text-zinc-400">
                  <div className="rounded-2xl border border-white/10 p-3">Jawline</div>
                  <div className="rounded-2xl border border-white/10 p-3">Symmetry</div>
                  <div className="rounded-2xl border border-white/10 p-3">Shape</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <Section
        eyebrow="Why it hits"
        title="Built for men who care how they actually look in motion, photos, and first impressions."
        description="This is not a generic beauty toy. It is a grooming decision layer that helps you choose cuts and facial hair based on proportions, not vibe." 
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map(([title, description]) => (
            <Card key={title}>
              <p className="text-lg font-bold text-white">{title}</p>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How it works"
        title="Three steps. No nonsense."
        description="The whole product loop should feel obvious: upload, understand your structure, and leave with better style decisions."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step}>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Step 0{index + 1}</p>
              <p className="mt-4 text-xl font-black text-white">{step}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="By face shape"
        title="Haircut direction by structure"
        description="The right strategy depends on whether you need more height, less width, more definition, or less length."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {faceShapeCards.map((card) => (
            <Card key={card.name}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-white">{card.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">{card.summary}</p>
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  AI ready
                </span>
              </div>
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
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Core paths"
        title="The SEO and product structure already points where the business should go."
        description="Tool pages catch broad intent. Content pages catch long-tail male queries. Result pages carry trust and conversion."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["/face-shape-detector-for-men", "Face Shape Detector for Men", "The main product page for male-first analysis and recommendations."],
            ["/mens-hairstyles-by-face-shape", "Men's Hairstyles by Face Shape", "Cluster hub for haircut decisions across square, oval, round, and oblong faces."],
            ["/beard-styles-by-face-shape", "Beard Styles by Face Shape", "Use beard shape to strengthen the jawline or reduce extra face length."],
          ].map(([href, title, description]) => (
            <Card key={href}>
              <p className="text-lg font-bold text-white">{title}</p>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{description}</p>
              <Link href={href} className="mt-6 inline-flex text-sm font-semibold text-emerald-300">
                Open path →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Blog cluster" title="Male-first SEO content that actually fits the product." description="These are the kinds of pages that support both search traffic and recommendation trust.">
        <div className="grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.slug}>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">{post.category}</p>
              <h3 className="mt-3 text-xl font-black text-white">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-emerald-300">
                Read guide →
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}
