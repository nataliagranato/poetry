import Link from 'next/link'
import { getBlogPosts } from 'app/poetry/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="block mb-4 py-1 text-neutral-900 [.dark_&]:text-neutral-100 tracking-tight hover:translate-x-1 transition-transform"
            href={`/poetry/${post.slug}`}
          >
            {post.metadata.title}
          </Link>
        ))}
    </div>
  )
}
