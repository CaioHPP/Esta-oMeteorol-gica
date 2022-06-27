# Javascript Express Prisma SQLite Server

Esse é um servidor básico em Node.js, que utiliza Express (web framework), Sequelize (ORM) e SQLite (database).

## Para rodar o projeto

Primeiro clone o projeto

```shell
git clone https://github.com/CaioHPP/EstacaoMeteorologica.git
```

Depois, instale as dependencias

```shell
cd client && yarn install
cd server && yarn install
```

````

Depois, teste a conexão com o banco e inicialize as tabelas fazendo uma requisição GET para cada uma das linhas abaixo

```shell
localhost:3000/test
localhost:3000/sync
````

**CUIDADO** `/sync` faz DROP e CREATE das tabelas, limpando todos os dados

Por fim, inicialize o servidor

```shell
yarn node src/index.js
```

Para recriar os arquivos de modelo, basta rodar o seguinte comando

```shell
yarn sequelize-auto -o "./models" -e sqlite -l esm -c ./config/config.json -T _prisma_migrations
```

## Rotas

- (GET) ´/leitura´ - Lista todas as leituras
- (POST) ´/leitura´ - Faz uma leitura

## Referências

- http://expressjs.com
- https://sequelize.org/docs/v6/
