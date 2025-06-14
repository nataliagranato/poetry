import { BlogPosts } from 'app/components/posts'

export const metadata = {
    title: 'Poetry',
    description: 'A arte da palavra escrita, falada e cantada.',
}

export default function Page() {
    return (
        <section>
            <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Poetry</h1>
            <BlogPosts />
        </section>
    )
}
