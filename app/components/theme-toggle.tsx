'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Verificar preferência salva ou preferência do sistema
        const saved = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        const shouldBeDark = saved === 'dark' || (!saved && prefersDark)
        setIsDark(shouldBeDark)

        // Aplicar o tema imediatamente
        applyTheme(shouldBeDark)
    }, [])

    const applyTheme = (dark: boolean) => {
        const html = document.documentElement
        if (dark) {
            html.classList.add('dark')
            html.style.colorScheme = 'dark'
        } else {
            html.classList.remove('dark')
            html.style.colorScheme = 'light'
        }
    }

    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)

        // Aplicar o tema
        applyTheme(newTheme)

        // Salvar preferência
        localStorage.setItem('theme', newTheme ? 'dark' : 'light')

        console.log('Theme toggled to:', newTheme ? 'dark' : 'light')
    }

    // Evitar hidratação mismatch
    if (!mounted) {
        return (
            <div className="p-2 w-10 h-10 rounded-lg">
                <div className="w-5 h-5"></div>
            </div>
        )
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
            aria-label={isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
            title={isDark ? 'Modo claro' : 'Modo escuro'}
        >
            <div className="transition-transform duration-200 hover:scale-110">
                {isDark ? (
                    // Ícone de sol (modo claro)
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-500 dark:text-yellow-400"
                    >
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                ) : (
                    // Ícone de lua (modo escuro)
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600 dark:text-blue-400"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                )}
            </div>
        </button>
    )
}
