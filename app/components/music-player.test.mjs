import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const source = fs.readFileSync(
  new URL('./music-player.tsx', import.meta.url),
  'utf8'
)

test('creates the SoundCloud iframe only after its API script is ready', () => {
  assert.match(source, /scriptReady\s*&&\s*\(\s*<iframe/)
})

test('initializes the widget synchronously when the iframe mounts', () => {
  assert.match(source, /ref=\{initializeWidget\}/)
})
