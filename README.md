# GitProxy

![](https://img.shields.io/github/issues/gabriellfsouza/git-proxy) ![](https://img.shields.io/github/forks/gabriellfsouza/git-proxy) ![](https://img.shields.io/github/stars/gabriellfsouza/git-proxy) ![]()

### Introdução

Esta aplicação funciona como uma interface para chamada às APIs de usuário do Git para listagem, detalhes e acesso aos repositórios.
Foi desenvolvida tanto a parte front quanto a back (ReactJS e NodeJS respectivamente).

Este projeto foi criado de forma que tanto a parte de front quanto a de back possam ser utilizadas de maneira simultânea.

## Pré requisitos

É necesário ter o Node.JS, YARN e git previamente instalados na máquina.

## Instalação

Baixe o projeto conforme abaixo:

```
git clone https://github.com/gabriellfsouza/git-proxy
cd git-proxy
yarn

```

## Inicialização/build do projeto

A partir da raiz do projeto:

```
yarn dev

ou

yarn build
yarn start

```

## Desenvolvimento

Para novos desenvolvimentos, caso os mesmos forem feitos via VsCode, recomenda-se que o projeto seja aberto ou na parte web/back em janelas separadas (por conta das configurações do preetier, eslint, etc).

```
code ./web

ou

code ./server

```

## Testes

Há testes criados apenas para a parte backend do projeto. Para executar os testes basta acessar a pasta server e digitar o comando abaixo:

```
cd server
yarn test
```

Também foram disponibilizadas possibilidades de depuração no projeto, basta executar os scripts de debug que se encontram no projeto.

### Arquivo .env

Todos os projetos possuem um arquivo ".env.example", que devem ser renomeados e utilizados como arquivo de configuração para as variáveis de ambiente.

Qualquer dúvida, podem entrar em contato comigo no e-mail gabriellfsouza@gmail.com.
