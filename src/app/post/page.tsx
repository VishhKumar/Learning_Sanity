import Link from 'next/link'
import client from '../lib/sanity'
import { postsQuery } from '../lib/queries'
import { PortableText } from 'next-sanity'

export default async function BlogListPage() {
  const posts = await client.fetch(postsQuery)

  console.log("fetched posts", posts)
  return (
    <>
      {/* Header */}
      <header className="bg-black text-white py-6 text-center">
        <h1 className="text-4xl font-bold">My Blog</h1>
        <p className="text-gray-300">Insights, tutorials, and more</p>
      </header>

      {/* Main Blog Grid */}
      <main className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any, index: number) => (
          <Link key={index} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white">
              {post.mainImage?.asset?.url && (
                <img
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt || post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-600">
                  <PortableText value={post.body} />
                  {/* {post.description?.slice(0, 100) || 'No description available.'} */}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} My Blog. All rights reserved.
      </footer>
    </>
  )
}
