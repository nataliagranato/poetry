'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    )
  }, [])

  if (!theme) {
    return <span aria-hidden="true" className="m-1 size-8 shrink-0" />
  }

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    document.documentElement.style.colorScheme = nextTheme
    setTheme(nextTheme)

    try {
      sessionStorage.setItem('theme', nextTheme)
    } catch {}
  }

  const activateLightTheme = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        activateLightTheme ? 'Ativar tema claro' : 'Ativar tema escuro'
      }
      title={activateLightTheme ? 'Ativar tema claro' : 'Ativar tema escuro'}
      className="m-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white dark:focus-visible:outline-neutral-300"
    >
      {activateLightTheme ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.5 14.2A8 8 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
        </svg>
      )}
    </button>
  )
}
