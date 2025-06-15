import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Natália Granato
        </p>
        <div className="flex gap-4">
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
        </div>
      </div>
    </footer>
  )
}
