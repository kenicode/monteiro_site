# Integração do MontSystem ao Site da Contabilidade Monteiro

Este projeto integra o sistema MontSystem ao site da empresa de contabilidade Monteiro Solução Contábil, adicionando uma página de apresentação do sistema e implementando o acesso ao sistema através do site principal.

## Estrutura do Projeto

```
monteiro-solucao-contabil-completo/
├── css/                  # Arquivos CSS do site principal
├── fontes/               # Fontes utilizadas no site
├── img/                  # Imagens do site
├── js/                   # Scripts JavaScript do site
├── montsystem/           # Sistema MontSystem (React + Express)
│   ├── client/           # Frontend do MontSystem (React)
│   ├── server/           # Backend do MontSystem (Express)
│   └── ...
├── pages/                # Páginas do site
│   ├── ferramentas/      # Páginas de ferramentas
│   ├── servicos/         # Páginas de serviços
│   └── montsystem.html   # Nova página de apresentação do MontSystem
├── footer.html           # Rodapé do site
└── index.html            # Página inicial do site
```

## Funcionalidades Implementadas

1. **Adição de Link no Menu Principal**
   - Foi adicionado um novo item de menu "MontSystem" na barra de navegação do site principal
   - O link direciona para a nova página de apresentação do sistema

2. **Página de Apresentação do Sistema**
   - Foi criada uma nova página HTML no site principal que apresenta o MontSystem
   - Inclui descrição do sistema, principais funcionalidades e benefícios
   - Contém botões para acessar o sistema (login) ou criar uma nova conta (cadastro)

3. **Acesso ao Sistema**
   - Implementado redirecionamento para o MontSystem através da rota `/montsystem`
   - Configurado servidor Express para integrar o site e o sistema

## Como Executar o Projeto

1. Instale as dependências:
   ```
   npm install
   ```

2. Inicie o servidor:
   ```
   node server.js
   ```

3. Acesse o site no navegador:
   ```
   http://localhost:3000
   ```

## Credenciais de Acesso Administrativo

Para fins de teste, utilize as seguintes credenciais:
- Email: admin@contabilmonteiro.com.br
- Senha: L1b3rd4d3@

**Importante:** Estas credenciais são apenas para testes e não devem ser compartilhadas publicamente.

## Tecnologias Utilizadas

- **Frontend do Site**: HTML, CSS, JavaScript
- **Frontend do Sistema**: React, TailwindCSS
- **Backend**: Express.js
- **Integração**: Node.js

