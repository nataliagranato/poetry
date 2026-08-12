export const themeScript = `
(() => {
  let theme = 'dark'
  try {
    const storedTheme = sessionStorage.getItem('theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      theme = storedTheme
    } else if (typeof window.matchMedia === 'function') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  } catch {
    theme = 'dark'
  }
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
})()
`
