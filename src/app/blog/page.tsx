import type { Metadata } from "next"
import Link from "next/link"
import { Card, Section } from "@/components/ui-blocks"
import { blogPosts } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Blog | Looksmaxxing Hair AI",
  description: "Male-first face shape, haircut, and beard content built around real grooming decisions.",
}

export default function BlogPage() {
  return (
    <Section eyebrow="Blog" title="Male-first face shape guides" description="SEO content should support the product, not wander off into generic style fluff.">
      <div className="grid gap-5 md:grid-cols-3">
        {blogPosts.map((post) => (
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
  )
}
