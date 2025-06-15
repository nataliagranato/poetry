import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Seu silêncio não te protegerá
      </h1>

      <p className="mb-8 text-neutral-600 dark:text-neutral-400">
        {`Quais são as palavras que você ainda não tem? O que você precisa dizer? Quais são as tiranias que você engole dia após dia e tenta tomar para si, até adoecer e morrer por causa delas, ainda em silêncio? 
        Audre Lorde`}
      </p>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
