import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Músicas',
  description: 'Playlists e músicas que inspiram a poesia.',
}

const playlists = [
  {
    id: '4EtRYHp4eziMvM8Y4GgZEI',
    title: 'After Years',
  },
  {
    id: '63nRtePPwuVCUG1sFYqkO8',
    title: 'Trimegisto',
  },
  {
    id: '6RnUlAR515pSlPtUVCt6jA',
    title: 'Death',
  },
]

export default function MusicPage() {
  return (
    <section className="animate-fade-in">
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">Músicas</h1>
      <p className="mb-8 text-neutral-400">
        Trilhas sonoras que acompanham a escrita.
      </p>
      <div className="space-y-8">
        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <h2 className="text-lg font-medium mb-3 text-neutral-200">
              {playlist.title}
            </h2>
            <iframe
              src={`https://open.spotify.com/embed/playlist/${playlist.id}?theme=0`}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
