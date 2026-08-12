import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

import { getBlogPost } from './utils.ts'

test('resolves every poem from asynchronous route params', async () => {
    const postsDirectory = path.join(process.cwd(), 'app', 'poetry', 'posts')
    const slugs = fs
        .readdirSync(postsDirectory)
        .filter((file) => path.extname(file) === '.mdx')
        .map((file) => path.basename(file, '.mdx'))

    assert.ok(slugs.length > 2)

    for (const slug of slugs) {
        const post = await getBlogPost(Promise.resolve({ slug }))

        assert.equal(post?.slug, slug, `Poem not found for slug: ${slug}`)
    }
})
