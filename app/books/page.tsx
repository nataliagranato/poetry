import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Livros',
  description: 'Recomendações de leitura.',
}

interface Book {
  title: string
  author: string
  description?: string
  cover?: string
  link?: string
}

const books: Book[] = [
  {
    title: 'Orgulho e Preconceito',
    author: 'Jane Austen',
    description: 'Um clássico sobre amor, orgulho e as convenções sociais da Inglaterra do século XIX.',
    cover: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
  },
  {
    title: 'Tristão e Isolda',
    author: 'Joseph Bédier',
    description: 'A lenda medieval de amor trágico que atravessa séculos.',
    cover: 'https://covers.openlibrary.org/b/olid/OL7950089M-L.jpg',
  },
  {
    title: 'O Morro dos Ventos Uivantes',
    author: 'Emily Brontë',
    description: 'Uma história de paixão devastadora e vingança nos pântanos de Yorkshire.',
    cover: 'https://covers.openlibrary.org/b/isbn/9780141439556-L.jpg',
  },
]

export default function BooksPage() {
  return (
    <section className="animate-fade-in">
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">Livros</h1>
      <p className="mb-8 text-neutral-400">
        Livros que moldaram meu olhar sobre o mundo.
      </p>
      <div className="grid gap-6">
        {books.map((book) => (
          <div
            key={book.title}
            className="flex gap-4 border border-neutral-800 rounded-lg p-4 hover:border-neutral-600 transition-colors"
          >
            {book.cover && (
              <img
                src={book.cover}
                alt={`Capa de ${book.title}`}
                width={80}
                height={120}
                className="rounded object-cover flex-shrink-0"
              />
            )}
            <div>
              <h2 className="text-lg font-medium text-neutral-100">
                {book.link ? (
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {book.title}
                  </a>
                ) : (
                  book.title
                )}
              </h2>
              <p className="text-sm text-neutral-400 mt-1">{book.author}</p>
              {book.description && (
                <p className="text-sm text-neutral-500 mt-2">
                  {book.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
