# Theme Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar um botão global que alterna entre claro e escuro, inicia pela preferência do sistema em cada nova sessão e usa escuro como fallback.

**Architecture:** Um script inline executado antes da hidratação escolhe e aplica o tema inicial sem flash visual. Um componente cliente lê o tema aplicado, alterna a classe `dark` e persiste somente a escolha manual em `sessionStorage`.

**Tech Stack:** Next.js 16 App Router, React 18, TypeScript, Tailwind CSS 4, Node.js test runner, Browser plugin.

## Global Constraints

- O tema inicial de uma nova sessão segue `prefers-color-scheme`.
- Se a preferência do sistema estiver indisponível, o tema inicial é escuro.
- A escolha manual persiste somente em `sessionStorage`.
- O controle fica no canto direito da navegação superior.
- Não adicionar dependências.
- Não adicionar uma terceira opção explícita de tema do sistema.

---

## File Structure

- `app/theme-script.ts`: exporta o script de inicialização executado antes da hidratação.
- `app/theme-script.test.mjs`: executa o script real em contextos controlados e valida preferência, fallback e armazenamento.
- `app/components/theme-toggle.tsx`: renderiza o controle acessível e gerencia a alternância no cliente.
- `app/components/nav.tsx`: posiciona o controle à direita dos links.
- `app/layout.tsx`: remove o tema escuro forçado e injeta o script inicial.

### Task 1: Inicialização do tema antes da hidratação

**Files:**
- Create: `app/theme-script.ts`
- Create: `app/theme-script.test.mjs`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `themeScript: string`, um programa autocontido que aplica `dark` no `document.documentElement` e define `style.colorScheme`.
- Storage contract: chave `theme`, valores permitidos `light` e `dark`.

- [ ] **Step 1: Write the failing script tests**

Criar `app/theme-script.test.mjs` usando `node:test`, `node:assert/strict` e `node:vm`. O helper do teste deve executar `themeScript` com fakes completos para `document.documentElement.classList`, `style`, `sessionStorage` e `matchMedia`. Cobrir literalmente:

```js
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
  const result = runThemeScript({ storageThrows: true, matchMediaMissing: true })
  assert.equal(result.darkClass, true)
  assert.equal(result.colorScheme, 'dark')
})
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `node --experimental-strip-types --test app/theme-script.test.mjs`

Expected: FAIL because `./theme-script.ts` does not exist.

- [ ] **Step 3: Implement the minimal initialization script**

Criar `app/theme-script.ts` com um script autocontido que:

```ts
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
```

Em `app/layout.tsx`, remover `dark` da classe estática do `<html>`, adicionar `suppressHydrationWarning` e inserir `<script dangerouslySetInnerHTML={{ __html: themeScript }} />` como primeiro filho do `<head>`.

- [ ] **Step 4: Run the test and confirm GREEN**

Run: `node --experimental-strip-types --test app/theme-script.test.mjs`

Expected: 4 tests PASS with no failures.

- [ ] **Step 5: Commit the initialization boundary**

```bash
git add app/theme-script.ts app/theme-script.test.mjs app/layout.tsx
git commit -m "feat: initialize theme from browser preference"
```

### Task 2: Botão acessível de alternância

**Files:**
- Create: `app/components/theme-toggle.tsx`
- Modify: `app/components/nav.tsx`

**Interfaces:**
- Consumes: classe `dark` e `style.colorScheme` aplicados ao `<html>` pelo `themeScript`.
- Produces: componente `ThemeToggle(): JSX.Element | null`.
- Storage contract: grava `sessionStorage.setItem('theme', nextTheme)` somente após clique.

- [ ] **Step 1: Establish the failing rendered check**

Iniciar a aplicação com `npm run dev` e abrir `/` no Browser plugin. Consultar um botão com nome acessível `Ativar tema claro` ou `Ativar tema escuro`.

Expected: FAIL because the theme button is absent.

- [ ] **Step 2: Implement the client component**

Criar `app/components/theme-toggle.tsx` com `'use client'`, estado `theme: 'light' | 'dark' | null` e `useEffect` para ler `document.documentElement.classList.contains('dark')`. No clique:

```ts
const nextTheme = theme === 'dark' ? 'light' : 'dark'
document.documentElement.classList.toggle('dark', nextTheme === 'dark')
document.documentElement.style.colorScheme = nextTheme
setTheme(nextTheme)
try {
  sessionStorage.setItem('theme', nextTheme)
} catch {}
```

Enquanto `theme` for `null`, renderizar um espaço reservado de `32px` com `aria-hidden="true"` para evitar deslocamento. Depois, renderizar um `<button type="button">` de `32px`, foco visível, borda discreta e:

- tema escuro: SVG de sol e `aria-label="Ativar tema claro"`;
- tema claro: SVG de lua e `aria-label="Ativar tema escuro"`.

- [ ] **Step 3: Place the control in navigation**

Em `app/components/nav.tsx`, importar `ThemeToggle`, alterar o `<nav>` para distribuir links e controle com `justify-between`, manter os links agrupados à esquerda e inserir `<ThemeToggle />` à direita.

- [ ] **Step 4: Verify the interaction in Browser**

Recarregar `/`, localizar o botão pelo nome acessível, clicar e verificar:

- o nome alterna entre `Ativar tema claro` e `Ativar tema escuro`;
- a classe `dark` no `<html>` alterna;
- fundo e texto mudam visualmente;
- após recarregar, a escolha manual da sessão permanece.

Expected: PASS for both directions and reload persistence.

- [ ] **Step 5: Commit the theme control**

```bash
git add app/components/theme-toggle.tsx app/components/nav.tsx
git commit -m "feat: add accessible theme toggle"
```

### Task 3: Verificação integrada e visual

**Files:**
- Verify only: all changed application and test files.

**Interfaces:**
- Consumes: `themeScript` and `ThemeToggle` completed in Tasks 1 and 2.
- Produces: evidence that initialization, interaction, accessibility, and responsive layout work together.

- [ ] **Step 1: Run automated checks**

```bash
node --experimental-strip-types --test app/theme-script.test.mjs
npm run build
git diff --check main...HEAD
```

Expected: all commands exit 0. If dependency installation remains incomplete, run `npm ci --registry=https://registry.npmjs.org` once and rerun the failed command.

- [ ] **Step 2: Define and execute the Browser flow**

Flow: `/` loads using browser/system preference -> user clicks the theme button -> colors and accessible label invert -> reload preserves the session choice.

Use desktop viewport and one mobile-sized viewport. For each, verify page title, meaningful DOM, absence of framework overlay, console warnings/errors, navigation layout, button focus, interaction and fresh screenshot evidence.

- [ ] **Step 3: Review the final diff**

Run:

```bash
git status -sb
git diff --check main...HEAD
git diff --stat main...HEAD
```

Expected: only the specification, plan, theme script/test, layout, toggle and navigation changes are present; no generated screenshots or temporary browser artifacts are tracked.
