import { getBlogPosts } from 'app/poetry/utils'

export const baseUrl = 'https://poetry.nataliagranato.xyz'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/poetry/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/poetry'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
