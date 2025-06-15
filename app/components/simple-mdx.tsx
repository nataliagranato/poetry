'use client'

interface SimpleMDXProps {
    source: string
}

export function SimpleMDX({ source }: SimpleMDXProps) {
    // Processa o conteúdo MDX simples para poesia
    const processContent = (content: string) => {
        return content
            .split('\n')
            .map((line, index) => {
                // Título (linhas que começam com #)
                if (line.startsWith('# ')) {
                    return `<h1 key=${index} class="text-2xl font-bold mb-4">${line.slice(2)}</h1>`
                }
                if (line.startsWith('## ')) {
                    return `<h2 key=${index} class="text-xl font-semibold mb-3">${line.slice(3)}</h2>`
                }

                // Linha vazia
                if (line.trim() === '') {
                    return `<br key=${index} />`
                }

                // Texto normal
                return `<p key=${index} class="mb-2">${line}</p>`
            })
            .join('')
    }

    return (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div
                dangerouslySetInnerHTML={{
                    __html: processContent(source)
                }}
            />
        </div>
    )
} 