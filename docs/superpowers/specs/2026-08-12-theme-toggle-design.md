# Seletor de tema claro e escuro

## Objetivo

Adicionar um controle global e acessível que permita alternar entre os temas claro e escuro. A cada nova sessão do navegador, o tema inicial deve seguir `prefers-color-scheme`; quando essa preferência não puder ser detectada, o tema escuro será usado.

## Experiência do usuário

O controle ficará no canto direito da navegação superior, ao lado dos links existentes. Será um botão compacto com um ícone de sol no tema escuro e de lua no tema claro, comunicando a ação disponível. O botão terá rótulo acessível, foco visível e estado perceptível sem depender apenas de cor.

Ao clicar, o tema muda imediatamente em todas as páginas. A escolha permanece durante navegações e recarregamentos da sessão atual, mas não é mantida depois que a sessão do navegador termina.

## Arquitetura

Um componente cliente `ThemeToggle` será responsável por:

- determinar o tema inicial a partir de `sessionStorage` ou `prefers-color-scheme`;
- usar escuro como fallback;
- aplicar ou remover a classe `dark` no elemento `<html>`;
- atualizar `sessionStorage` quando o usuário alternar o tema;
- renderizar o botão somente depois que o estado do cliente estiver disponível.

O componente será inserido na `Navbar`. Um script inline no layout aplicará o mesmo algoritmo antes da hidratação para evitar que a página pisque no tema incorreto. Nenhuma dependência externa será adicionada; os ícones serão SVGs pequenos no próprio componente.

## Fluxo de dados

1. Antes da primeira pintura, o script consulta `sessionStorage`.
2. Sem escolha na sessão, consulta `window.matchMedia('(prefers-color-scheme: dark)')`.
3. Se a API estiver indisponível, seleciona escuro.
4. Aplica a classe `dark` e o `color-scheme` correspondente ao documento.
5. O componente cliente lê o estado aplicado e apresenta a ação inversa.
6. Um clique alterna o estado, atualiza o documento e grava a escolha somente em `sessionStorage`.

## Tratamento de falhas

Leituras ou escritas em `sessionStorage` podem falhar em contextos restritos. O controle continuará funcionando em memória durante a página atual e usará o tema escuro como fallback quando a preferência do sistema não estiver disponível. O script inicial será protegido para não impedir a renderização da página.

## Testes e validação

- testar a seleção inicial para sistema claro, sistema escuro e API indisponível;
- testar a alternância e a atualização de `sessionStorage`;
- verificar rótulo acessível e estado do botão;
- executar as verificações existentes do projeto;
- abrir a aplicação no navegador e validar tema claro, tema escuro, recarregamento na mesma sessão, console e layout responsivo.

## Fora de escopo

- sincronizar mudanças do sistema depois que a sessão já foi iniciada;
- persistir a escolha entre sessões com `localStorage` ou cookie;
- adicionar uma terceira opção explícita chamada "sistema".
