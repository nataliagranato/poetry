const albums = [
  {
    url: 'https://soundcloud.com/nataliagranato/sets/celestial',
    title: 'HEAVENLY – Ato I: Ascensão e Fagulhas',
  },
  {
    url: 'https://soundcloud.com/nataliagranato/sets/celeste',
    title: 'HEAVENLY – Ato II: A Colisão, o Encanto e a Luz de Kandinsky',
  },
]

function widgetSrc(albumUrl: string) {
  const params = new URLSearchParams({
    url: albumUrl,
    color: '#ff5500',
    auto_play: 'false',
    hide_related: 'true',
    show_comments: 'false',
    show_user: 'true',
    show_reposts: 'false',
    show_teaser: 'false',
  })

  return `https://w.soundcloud.com/player/?${params.toString()}`
}

export function SoundCloudPlayer() {
  return (
    <section className="mt-12 space-y-8" aria-label="Álbuns no SoundCloud">
      {albums.map((album) => (
        <div key={album.url}>
          <h2 className="mb-3 text-lg font-medium text-neutral-800 [.dark_&]:text-neutral-200">
            {album.title}
          </h2>
          <iframe
            title={album.title}
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            loading="lazy"
            src={widgetSrc(album.url)}
            className="rounded-xl"
          />
        </div>
      ))}
    </section>
  )
}
