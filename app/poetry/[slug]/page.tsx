import { notFound } from 'next/navigation'
import { PoemReader } from '../../components/poem-reader'
import { SoundCloudPlayer } from '../../components/soundcloud-player'
import { getBlogPost, getBlogPosts } from 'app/poetry/utils'
import { baseUrl } from 'app/sitemap'

type PoetryPageProps = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    let posts = getBlogPosts()

    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: PoetryPageProps) {
    let post = await getBlogPost(params)
    if (!post) {
        return
    }

    let {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
    } = post.metadata
    let ogImage = image
        ? image
        : `${baseUrl}/og?title=${encodeURIComponent(title)}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `${baseUrl}/poetry/${post.slug}`,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    }
}

export default async function Poetry({ params }: PoetryPageProps) {
    let post = await getBlogPost(params)

    if (!post) {
        notFound()
    }

    return (
        <section className="animate-fade-in">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.metadata.title,
                        datePublished: post.metadata.publishedAt,
                        dateModified: post.metadata.publishedAt,
                        description: post.metadata.summary,
                        image: post.metadata.image
                            ? `${baseUrl}${post.metadata.image}`
                            : `/og?title=${encodeURIComponent(post.metadata.title)}`,
                        url: `${baseUrl}/poetry/${post.slug}`,
                        author: {
                            '@type': 'Person',
                            name: 'Natália Granato',
                        },
                    }),
                }}
            />
            <h1 className="title font-semibold text-2xl tracking-tighter">
                {post.metadata.title}
            </h1>
            <PoemReader content={post.content} />
            <SoundCloudPlayer />
        </section>
    )
}
