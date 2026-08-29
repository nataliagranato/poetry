import { BlogPosts } from 'app/components/posts'
import { SoundCloudPlayer } from 'app/components/soundcloud-player'

export default function Page() {
  return (
    <section className="animate-fade-in">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Uma Luz Honesta
      </h1>

      <div className="my-8">
        <BlogPosts />
      </div>
      <SoundCloudPlayer />
    </section>
  )
}
