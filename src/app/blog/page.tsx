import type { Metadata } from "next"
import Link from "next/link"
import { Card, Section } from "@/components/ui-blocks"
import { blogPosts } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Blog | Looksmaxxing Hair AI",
  description: "Face shape, looksmaxxing hair, beard, chin, and facial feature guides for men who want clearer grooming decisions and stronger rankings.",
}

export default function BlogPage() {
  const looksmaxxingPosts = blogPosts.filter((post) => post.category === "Looksmaxxing")
  const otherPosts = blogPosts.filter((post) => post.category !== "Looksmaxxing")

  return (
    <>
      <Section eyebrow="Looksmaxxing" title="Looksmaxxing hair, rating, chin, and tiers guides" description="Read the most relevant looksmaxxing content for men who want better rankings, stronger features, and more focused style decisions.">
        <div className="grid gap-5 md:grid-cols-3">
          {looksmaxxingPosts.map((post) => (
            <Card key={post.slug}>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">{post.category}</p>
              <h2 className="mt-3 text-2xl font-black text-white">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{post.description}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-zinc-500">{post.date}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-emerald-300">
                Read article →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Blog" title="Face shape, haircut, and beard guides" description="Read practical articles to help you choose better haircuts, beard styles, and grooming direction.">
        <div className="grid gap-5 md:grid-cols-3">
          {otherPosts.map((post) => (
            <Card key={post.slug}>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">{post.category}</p>
              <h2 className="mt-3 text-2xl font-black text-white">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{post.description}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-zinc-500">{post.date}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-emerald-300">
                Read article →
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}
