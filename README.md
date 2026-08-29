# Poetry

A arte da palavra escrita, falada e cantada por @nataliagranato

Acesse: https://poetry.nataliagranato.xyz

---

## ▶️ Como executar localmente

Este projeto usa Next.js com pnpm.

### Requisitos

- Node.js 20+
- pnpm 10.26.0 ou superior

### Instalação

```bash
corepack enable
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

A aplicação fica disponível em:

```text
http://localhost:3000
```

### Build de produção

```bash
pnpm build
pnpm start
```

### Troubleshooting

Se a porta 3000 estiver ocupada, pode haver outro processo do Next.js já rodando no projeto:

```bash
lsof -i :3000
```

Se necessário, pare o processo anterior e reinicie:

```bash
kill 274718
pnpm dev
```

Se o erro for relacionado a dependências, como `Failed to find tailwindcss`, rode:

```bash
pnpm install
```

---

## 🌐 Redes Sociais

- 🐦 **X (Twitter)**: https://x.com/granatowp
- 📸 **Instagram**: https://www.instagram.com/granatowp/
- 🌐 **Linktree**: https://linktr.ee/nataliagranato
