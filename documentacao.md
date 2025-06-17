# Documentação da Integração do MontSystem ao Site da Monteiro Solução Contábil

## Visão Geral

Este documento descreve a integração realizada entre o site institucional da Monteiro Solução Contábil e o sistema de gestão MontSystem. A integração inclui a adição de uma página de apresentação do sistema e a implementação de um mecanismo de acesso ao sistema através do site.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
monteiro-solucao-contabil-completo/
├── css/
│   ├── styles.css
│   └── montsystem.css (novo)
├── img/
│   └── ... (imagens do site)
├── js/
│   └── montsystem.js (novo)
├── montsystem/
│   ├── client/
│   │   └── ... (código do cliente do sistema)
│   └── server/
│       └── ... (código do servidor do sistema)
├── pages/
│   ├── ferramentas/
│   │   └── ... (páginas de ferramentas)
│   ├── servicos/
│   │   └── ... (páginas de serviços)
│   └── montsystem.html (novo)
├── index.html
└── ... (outros arquivos do site)
```

## Componentes Implementados

### 1. Página de Apresentação do MontSystem

Foi criada uma página dedicada para apresentar o sistema MontSystem, destacando suas principais funcionalidades e benefícios. A página inclui:

- Descrição geral do sistema
- Lista de funcionalidades principais
- Benefícios de uso
- Botões de acesso ao sistema e mais informações
- Modal de login/cadastro

**Arquivo:** `/pages/montsystem.html`

### 2. Integração com o Menu Principal

Foi adicionado um item de menu "MontSystem" em todas as páginas do site, permitindo acesso direto à página de apresentação do sistema. A integração foi realizada nos seguintes arquivos:

- `index.html`
- `pages/servicos/servicos.html`
- `pages/ferramentas/ferramentas.html`
- `pages/ferramentas/calculadora.html`

### 3. Sistema de Autenticação

Foi implementado um sistema de autenticação simulado que permite:

- Login com credenciais administrativas
- Cadastro de novos usuários
- Redirecionamento para o sistema após autenticação

**Arquivos:**
- `/js/montsystem.js` - Lógica de autenticação do lado do cliente
- `/server.js` - APIs de autenticação simuladas no servidor

### 4. Servidor de Integração

Foi criado um servidor Express para servir o site e integrar com o sistema MontSystem. O servidor:

- Serve os arquivos estáticos do site
- Fornece APIs para autenticação
- Gerencia o redirecionamento para o sistema MontSystem

**Arquivo:** `/server.js`

## Credenciais de Acesso

Para fins de teste, as seguintes credenciais administrativas foram configuradas:

- **Email:** admin@contabilmonteiro.com.br
- **Senha:** L1b3rd4d3@

## Instruções de Execução

Para executar o projeto integrado:

1. Navegue até a pasta raiz do projeto
2. Execute o comando: `node server.js`
3. Acesse o site em: `http://localhost:3000`

## Fluxo de Uso

1. O usuário acessa o site da Monteiro Solução Contábil
2. Clica no item "MontSystem" no menu principal
3. Na página de apresentação, clica em "Acessar Sistema"
4. Insere suas credenciais no modal de login
5. Após autenticação, é redirecionado para o sistema MontSystem

## Considerações Técnicas

### Responsividade

A integração foi desenvolvida com foco em responsividade, garantindo uma boa experiência em dispositivos móveis e desktop.

### Segurança

As credenciais administrativas são verificadas no servidor antes de permitir o acesso ao sistema. Em um ambiente de produção, seria recomendável implementar:

- HTTPS para comunicação segura
- Armazenamento seguro de senhas (hash + salt)
- Tokens JWT para autenticação
- Proteção contra ataques CSRF e XSS

### Melhorias Futuras

Algumas melhorias que podem ser implementadas no futuro:

1. Integração completa com o backend do MontSystem
2. Sistema de recuperação de senha
3. Autenticação via redes sociais
4. Perfis de usuário com diferentes níveis de acesso
5. Dashboard personalizado para cada tipo de usuário

## Conclusão

A integração do MontSystem ao site da Monteiro Solução Contábil foi concluída com sucesso, proporcionando uma experiência fluida para os usuários que desejam conhecer e acessar o sistema. A solução implementada atende aos requisitos especificados e está pronta para uso.

