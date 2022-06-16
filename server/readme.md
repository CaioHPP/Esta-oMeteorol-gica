# Javascript Express Prisma SQLite Server

Esse é um servidor básico em Node.js, que utiliza Express (web framework), Prisma (ORM) e SQLite (database).

## Para rodar o projeto

Primeiro clone o projeto

```shell
git clone https://github.com/MatheusCamilotto/express-prisma-sqlite-server.git ./server
```

Depois, instale as dependencias

```shell
yarn install
```

Depois, teste a conexão com o banco e inicialize as tabelas fazendo uma requisição GET para cada uma das linhas abaixo

```shell
localhost:3000/test
localhost:3000/sync
```

**CUIDADO** `/sync` faz DROP e CREATE das tabelas, limpando todos os dados

Por fim, inicialize o servidor
```shell
yarn node src/index.js
```

## Rotas

- (GET) ´/leitura´ - Lista todas as leituras
- (POST) ´/leitura´ - Faz uma leitura

## Referências
- http://expressjs.com
- https://sequelize.org/docs/v6/