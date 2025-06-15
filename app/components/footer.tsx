import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          © {new Date().getFullYear()} Natália Granato
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="https://www.instagram.com/granatowp"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Instagram
          </Link>
          <Link
            href="https://x.com/granatowp"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            X
          </Link>
          <Link
            href="https://bsky.app/profile/nataliagranato.bsky.social"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Bluesky
          </Link>
          <Link
            href="https://open.spotify.com/show/0X3f62yvAszkVq2afMfSKx?si=683cf5a1d08b4332"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Politicamente Preto
          </Link>
        </div>
      </div>
    </footer>
  )
}
