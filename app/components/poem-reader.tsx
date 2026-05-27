'use client'

import { useState } from 'react'
import { SimpleMDX } from './simple-mdx'

const MIN = 16
const MAX = 24
const DEFAULT = 18
const STEP = 2

export function PoemReader({ content }: { content: string }) {
  const [fontSize, setFontSize] = useState(DEFAULT)

  return (
    <div className="mt-6">
      <div className="flex items-center gap-1 mb-6">
        <button
          onClick={() => setFontSize((s) => Math.max(MIN, s - STEP))}
          disabled={fontSize <= MIN}
          aria-label="Diminuir tamanho da fonte"
          className="px-2 py-1 text-sm rounded text-neutral-500 hover:text-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          A-
        </button>
        <button
          onClick={() => setFontSize(DEFAULT)}
          aria-label="Tamanho padrão da fonte"
          className="px-2 py-1 text-sm rounded text-neutral-500 hover:text-neutral-200 transition-colors"
        >
          A
        </button>
        <button
          onClick={() => setFontSize((s) => Math.min(MAX, s + STEP))}
          disabled={fontSize >= MAX}
          aria-label="Aumentar tamanho da fonte"
          className="px-2 py-1 text-sm rounded text-neutral-500 hover:text-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          A+
        </button>
      </div>
      <article className="prose" style={{ fontSize: `${fontSize}px` }}>
        <SimpleMDX source={content} />
      </article>
    </div>
  )
}
