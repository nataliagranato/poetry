import Link from 'next/link'
import { MusicPlayer } from './music-player'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-200 py-8 [.dark_&]:border-neutral-800">
      <MusicPlayer />
      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-6 md:flex-row [.dark_&]:border-neutral-800">
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
