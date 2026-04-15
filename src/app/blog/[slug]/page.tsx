import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, Section } from "@/components/ui-blocks"
import { blogPosts } from "@/lib/site-data"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Looksmaxxing Hair AI`,
    description: post.description,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug)
  if (!post) notFound()

  const relatedLooksmaxxing = blogPosts.filter(
    (item) => item.slug !== post.slug && item.category === "Looksmaxxing",
  )
  const relatedStyle = blogPosts.filter(
    (item) => item.slug !== post.slug && item.category !== "Looksmaxxing",
  )

  return (
    <Section eyebrow={post.category} title={post.title} description={post.description}>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="p-8">
            <div className="space-y-5 text-base leading-8 text-zinc-300">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Related looksmaxxing guides</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {relatedLooksmaxxing.slice(0, 4).map((item) => (
                <div key={item.slug} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">{item.description}</p>
                  <Link href={`/blog/${item.slug}`} className="mt-3 inline-flex text-sm font-semibold text-emerald-300">
                    Read guide →
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Related style guides</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {relatedStyle.slice(0, 4).map((item) => (
                <div key={item.slug} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">{item.description}</p>
                  <Link href={`/blog/${item.slug}`} className="mt-3 inline-flex text-sm font-semibold text-emerald-300">
                    Read guide →
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Next step</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-300">
              <Link href="/result">See Your Result →</Link>
              <Link href="/">Upload a Photo →</Link>
              <Link href="/mens-hairstyles-by-face-shape">Men's Hairstyles by Face Shape →</Link>
              <Link href="/beard-styles-by-face-shape">Beard Styles by Face Shape →</Link>
            </div>
          </Card>
          <Card>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">Published</p>
            <p className="mt-3 text-lg font-bold text-white">{post.date}</p>
          </Card>
        </div>
      </div>
    </Section>
  )
}
