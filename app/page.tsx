import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Seu silêncio não te protegerá
      </h1>

      {/* Indicador visual do modo escuro - temporário para teste */}
      <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <span className="font-semibold">Teste do Modo Escuro:</span>
          <span className="ml-2 dark:hidden">🌞 Modo Claro Ativo</span>
          <span className="ml-2 hidden dark:inline">🌙 Modo Escuro Ativo</span>
        </p>
      </div>

      <p className="mb-4">
        {`Quais são as palavras que você ainda não tem? O que você precisa dizer? Quais são as tiranias que você engole dia após dia e tenta tomar para si, até adoecer e morrer por causa delas, ainda em silêncio? 
        Audre Lorde`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
