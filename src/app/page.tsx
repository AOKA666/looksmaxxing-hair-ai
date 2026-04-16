import Link from "next/link"
import { Card, Pill, Section } from "@/components/ui-blocks"
import { MockAnalysisFlow } from "@/components/mock-analysis-flow"
import { UploadTriggerButton } from "@/components/upload-trigger-button"
import { siteImages } from "@/lib/assets"
import { faceShapeCards, blogPosts } from "@/lib/site-data"

const whatYouGet = [
  [
    "Your likely face shape",
    "See whether your face looks more oval, round, square, oblong, or heart-shaped.",
  ],
  [
    "Haircuts that fit your structure",
    "Get hairstyle ideas that improve facial balance instead of fighting it.",
  ],
  [
    "Beard and styling guidance",
    "Use beard shape and styling direction to sharpen your overall presentation.",
  ],
]

const steps = [
  "Upload a clear selfie",
  "See your face shape analysis",
  "Get haircut and beard recommendations",
]

const stepDescriptions = [
  "Use a front-facing photo with good lighting and no heavy angles.",
  "Get your likely face shape and a quick read on facial balance.",
  "See what styles fit your features and what to avoid.",
]

export default function HomePage() {
  const looksmaxxingPosts = blogPosts.filter((post) => post.category === "Looksmaxxing")
  const stylePosts = blogPosts.filter((post) => post.category !== "Looksmaxxing")

  return (
    <>
      <section className="grid-noise mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
        <div className="flex flex-col justify-center">
          <Pill>AI Face Shape + Haircut Tool for Men</Pill>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            Detect Your Face Shape and Get Better Haircut Recommendations
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Upload one clear selfie and get your likely face shape, haircut recommendations, beard suggestions, and practical styling advice in seconds.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <UploadTriggerButton inputId="home-upload-input">Analyze My Face Shape</UploadTriggerButton>
            <Link
              href="#example-analysis"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-100 transition hover:border-emerald-500/40 hover:text-emerald-300"
            >
              See Example Result
            </Link>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-4 text-sm text-zinc-400 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-black text-white">1 photo</p>
              <p>One clear selfie is enough to start</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">Seconds</p>
              <p>Quick face shape analysis and styling direction</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">For men</p>
              <p>Built for haircut, beard, and barber decisions</p>
            </div>
          </div>
        </div>

        <MockAnalysisFlow compact inputId="home-upload-input" />
      </section>

      <Section
        eyebrow="What you get"
        title="What you get from one selfie"
        description="Upload a photo once and see the parts of the result that actually help you decide what to do next."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {whatYouGet.map(([title, description]) => (
            <Card key={title}>
              <p className="text-lg font-bold text-white">{title}</p>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How it works"
        title="How it works"
        description="The product should feel obvious: upload a selfie, review the analysis, and use the recommendations before your next haircut."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const icons = ["↑", "◎", "✦"]
            return (
              <Card key={step}>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-2xl font-black text-emerald-300">
                  {icons[index]}
                </div>
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Step 0{index + 1}</p>
                <p className="mt-4 text-xl font-black text-white">{step}</p>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{stepDescriptions[index]}</p>
              </Card>
            )
          })}
        </div>
      </Section>

      <Section
        eyebrow="By face shape"
        title="Haircut direction by structure"
        description="Different face shapes need different balance. The right cut depends on whether you need more height, less width, more definition, or less length."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {faceShapeCards.map((card) => {
            const imageMap = {
              Square: siteImages.faceShapes.square,
              Oval: siteImages.faceShapes.oval,
              Oblong: siteImages.faceShapes.oblong,
              Round: siteImages.faceShapes.round,
            } as const

            return (
              <Card key={card.name} className="overflow-hidden p-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="aspect-square w-full bg-zinc-950/40 p-4">
                  <img
                    src={imageMap[card.name as keyof typeof imageMap]}
                    alt={`${card.name} face shape male portrait`}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-6">
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
                </div>
              </Card>
            )
          })}
        </div>
      </Section>

      <Section
        eyebrow="Example result"
        title="See an example analysis"
        description="This is the kind of output the tool should give you after one upload: a face shape result, haircut ideas, beard suggestions, and what to avoid."
      >
        <div id="example-analysis" className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="overflow-hidden p-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteImages.resultMockup}
              alt="Example result dashboard for face shape and haircut analysis"
              className="h-full min-h-[380px] w-full object-cover"
            />
          </Card>
          <Card>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Example result</p>
            <h3 className="mt-4 text-3xl font-black text-white">Face shape: Oval</h3>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Best haircuts</p>
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  <li>• Textured crop</li>
                  <li>• Side part</li>
                  <li>• Taper fade</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Beard suggestion</p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">Light stubble or a short boxed beard usually works well.</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-300">Avoid</p>
              <p className="mt-3 text-sm leading-7 text-zinc-300">Extra width on the sides or heavy volume that stretches the face too far upward.</p>
            </div>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Why face shape matters"
        title="Why face shape changes haircut advice"
        description="Different cuts shift balance in different ways. Some add height, some reduce width, and some make long faces look even longer. That is why face shape changes what actually works."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Height changes balance", "Some styles add vertical length and make a face look longer."],
            ["Width changes structure", "Some cuts add side bulk and change how the jaw and cheeks read."],
            ["Beard shape matters too", "Beard outline can sharpen a jawline or make the lower face heavier."],
            ["This is where looksmaxxing starts", "Better haircut decisions are one of the easiest ways to improve overall facial presentation."],
          ].map(([title, description]) => (
            <Card key={title}>
              <p className="text-lg font-bold text-white">{title}</p>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Looksmaxxing" title="Looksmaxxing guides for hair, ratings, chin, and facial features" description="Start with the highest-return looksmaxxing topics if you want to improve facial balance, rankings, and overall presentation.">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="overflow-hidden p-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteImages.looksmaxxingSection}
              alt="Looksmaxxing visual for men's hair, jawline, and facial structure"
              className="h-full min-h-[360px] w-full object-cover"
            />
          </Card>
          <div className="grid gap-5 md:grid-cols-2">
            {looksmaxxingPosts.map((post) => (
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
        </div>
      </Section>

      <Section eyebrow="Popular guides" title="Go deeper with face shape and hairstyle guides" description="Read practical articles if you want to compare face shapes, pick better cuts, and choose beard styles that fit your structure.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stylePosts.slice(0, 4).map((post) => (
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

      <Section eyebrow="FAQ" title="Questions people ask before trying the tool" description="These are the practical questions most users want answered before uploading a photo.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["How does the face shape detector work?", "You upload a clear selfie and the tool analyzes overall facial structure, proportions, and likely face shape patterns."],
            ["Can this tool recommend haircuts for my face shape?", "Yes. The result is designed to help you choose haircut directions that fit your structure and avoid common mistakes."],
            ["Does it also suggest beard styles?", "Yes. Beard suggestions are included because beard shape can change jawline definition and lower-face balance."],
            ["Do I need a perfect selfie?", "No. You just need a clear front-facing photo with decent lighting and a visible forehead, cheekbones, and jawline."],
            ["Is this tool only for men?", "The current product positioning is built around men’s haircut and beard decisions."],
            ["Can I use it before going to a barber?", "Yes. That is one of the best use cases. You can use the result as a starting point before your next haircut."],
          ].map(([question, answer]) => (
            <Card key={question}>
              <p className="text-lg font-bold text-white">{question}</p>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{answer}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Final step" title="Upload a selfie and analyze your face shape" description="If you want better haircut recommendations, beard suggestions, and clearer grooming direction, start with one photo.">
        <div className="flex flex-wrap gap-4">
          <UploadTriggerButton inputId="home-upload-input">Analyze My Face Shape</UploadTriggerButton>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-zinc-100 transition hover:border-emerald-500/40 hover:text-emerald-300"
          >
            Read the guides
          </Link>
        </div>
      </Section>
    </>
  )
}
