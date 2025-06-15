'use client'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Página não encontrada</p>
      <a
        href="/"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        Voltar para a página inicial
      </a>
    </div>
  )
}
