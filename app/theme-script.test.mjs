import assert from 'node:assert/strict'
import test from 'node:test'
import vm from 'node:vm'

import { themeScript } from './theme-script.ts'

function runThemeScript({
  storedTheme = null,
  systemDark = false,
  storageThrows = false,
  matchMediaMissing = false,
} = {}) {
  const classNames = new Set()
  const documentElement = {
    classList: {
      toggle(className, enabled) {
        if (enabled) {
          classNames.add(className)
        } else {
          classNames.delete(className)
        }
      },
    },
    style: {},
  }
  const context = {
    document: { documentElement },
    sessionStorage: {
      getItem() {
        if (storageThrows) {
          throw new Error('storage unavailable')
        }
        return storedTheme
      },
    },
    window: matchMediaMissing
      ? {}
      : {
          matchMedia() {
            return { matches: systemDark }
          },
        },
  }

  vm.runInNewContext(themeScript, context)

  return {
    darkClass: classNames.has('dark'),
    colorScheme: documentElement.style.colorScheme,
  }
}

test('uses the system dark preference when the session has no choice', () => {
  const result = runThemeScript({ storedTheme: null, systemDark: true })
  assert.equal(result.darkClass, true)
  assert.equal(result.colorScheme, 'dark')
})

test('uses the system light preference when the session has no choice', () => {
  const result = runThemeScript({ storedTheme: null, systemDark: false })
  assert.equal(result.darkClass, false)
  assert.equal(result.colorScheme, 'light')
})

test('prefers the session choice over the system preference', () => {
  const result = runThemeScript({ storedTheme: 'light', systemDark: true })
  assert.equal(result.darkClass, false)
  assert.equal(result.colorScheme, 'light')
})

test('falls back to dark when browser preferences are unavailable', () => {
  const result = runThemeScript({
    storageThrows: true,
    matchMediaMissing: true,
  })
  assert.equal(result.darkClass, true)
  assert.equal(result.colorScheme, 'dark')
})
