import Link from "next/link"
import { Card, Pill, Section } from "@/components/ui-blocks"
import { MockAnalysisFlow } from "@/components/mock-analysis-flow"
import { UploadTriggerButton } from "@/components/upload-trigger-button"
import { faceShapeCards, blogPosts } from "@/lib/site-data"

const features = [
  ["Face shape analysis", "See your most likely face shape and understand why it fits your features."],
  ["Looksmaxxing hair guidance", "Find haircut ideas that improve facial balance, structure, and overall looksmaxxing hair potential."],
  ["Beard guidance", "Use beard shape to improve jaw definition, chin balance, and overall facial harmony."],
  ["Clearer style direction", "Get focused advice for men who want to look sharper in real life and in photos."],
]

const steps = [
  "Upload a clear, front-facing photo.",
  "See your face shape analysis and facial balance summary.",
  "Get haircut, beard, and style recommendations that fit your features.",
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
            Upload one clear selfie and get face shape insights, looksmaxxing hair suggestions, beard recommendations, chin and jawline feedback, and practical style direction designed for men.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <UploadTriggerButton inputId="home-upload-input">Scan your face</UploadTriggerButton>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-4 text-sm text-zinc-400 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-black text-white">4s</p>
              <p>Fast AI-style looksmaxxing analysis</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">For men</p>
              <p>Focused on hair, beard, jawline, chin, and frame choices that suit male styling goals</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">Actionable</p>
              <p>Not just a label. You get clear rankings, recommendations, and what to do next.</p>
            </div>
          </div>
        </div>

        <MockAnalysisFlow compact inputId="home-upload-input" />
      </section>

      <Section
        eyebrow="Why use it"
        title="Built for men who want clearer grooming, haircut, and looksmaxxing decisions."
        description="Use face shape, proportions, jawline strength, cheekbone balance, and chin structure to choose styles that make you look sharper and more balanced." 
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
        title="Three simple steps"
        description="Upload a photo, review your face analysis and looksmaxxing rating signals, and use the recommendations to improve your look."
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
                  Recommended
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
        eyebrow="Explore"
        title="Go deeper into the style advice that fits you best"
        description="Browse focused pages for face shape analysis, looksmaxxing hair ideas, beard recommendations, and practical facial feature guidance."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["/result", "Your Result", "See how your face shape result turns into haircut, beard, style advice, and a practical looksmaxxing rating view."],
            ["/mens-hairstyles-by-face-shape", "Men's Hairstyles by Face Shape", "Compare haircut ideas for square, oval, round, and oblong face shapes."],
            ["/beard-styles-by-face-shape", "Beard Styles by Face Shape", "Find beard styles that improve balance and sharpen your features."],
          ].map(([href, title, description]) => (
            <Card key={href}>
              <p className="text-lg font-bold text-white">{title}</p>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{description}</p>
              <Link href={href} className="mt-6 inline-flex text-sm font-semibold text-emerald-300">
                Explore →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Guides" title="Popular haircut and beard guides" description="Read practical advice for face shape, haircuts, beards, and men's style decisions.">
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
