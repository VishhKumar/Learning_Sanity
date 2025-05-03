// src/app/post/[slug]/page.tsx

import client from '@/app/lib/sanity'
import { PortableText } from 'next-sanity'
import { notFound } from 'next/navigation'

const query = `
  *[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage {
      asset -> {
        url
      },
      alt
    },
    body,
    author -> {
      name
    },
    publishedAt
  }
`

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(query, { slug: params.slug })

  if (!post) return notFound()

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      {post.author && (
        <p className="text-gray-600 mb-4">
          By {post.author.name} on {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      )}
      {post.mainImage?.asset?.url && (
        <img
          src={post.mainImage.asset.url}
          alt={post.mainImage.alt || post.title}
          className="w-1/2 h-auto rounded-md mb-6"
        />
      )}
      <div className="prose">
        <PortableText value={post.body} />
      </div>
    </main>
  )
}
