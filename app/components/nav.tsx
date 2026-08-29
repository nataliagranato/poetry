import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

type NavItem = {
  name: string
  external?: boolean
}

const navItems: Record<string, NavItem> = {
  '/': {
    name: 'início',
  },
  '/about': {
    name: 'sobre',
  },
  '/#musica': {
    name: 'músicas',
  },
  '/books': {
    name: 'livros',
  },
}

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start justify-between relative px-0 pb-0 fade scroll-pr-6"
          id="nav"
        >
          <div className="flex flex-row space-x-0">
            {Object.entries(navItems).map(([path, { name, external }]) => {
              const className =
                'transition-all hover:text-neutral-800 [.dark_&]:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1'

              if (external) {
                return (
                  <a
                    key={path}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {name}
                  </a>
                )
              }

              return (
                <Link key={path} href={path} className={className}>
                  {name}
                </Link>
              )
            })}
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </aside>
  )
}
