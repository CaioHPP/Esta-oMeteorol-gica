# Javascript Express Sequelize SQLite Server

Esse é um servidor básico em Node.js, que utiliza Express (web framework), Sequelize (ORM) e SQLite (database) para rodar uma Estação Meteorológica via localhost.

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

- Inicie o servidor

```shell
cd server && node src/index.js
```

Depois, teste a conexão com o banco e inicialize as tabelas fazendo uma requisição GET para cada uma das linhas abaixo

```shell
localhost:3001/test
localhost:3001/sync
```

Caso necessite recriar os arquivos de modelo, basta rodar o seguinte comando

```shell
yarn sequelize-auto -o "./models" -e sqlite -l esm -c ./config/config.json -T _prisma_migrations
```

**CUIDADO** `/sync` faz DROP e CREATE das tabelas, limpando todos os dados

- Inicialize a página.

Isso pode ser feito utilizando o Live Server ou utilizando o Serve a partir do seguinte comando:

```shell
cd client && yarn serve
```

## Função popularDB

Para testar a aplicação com dados gerados aleatóriamente entre as datas de 26/05/2022 a 01/06/2022, faça um get na seguinte URL:

```shell
localhost:3001/popularDB
```

## Rotas do servidor

- (GET) ´/leitura/recentes´ - Lista as últimas 30 leituras.
- (GET) ´/leitura/filtrado´ - Lista as leituras filtradas por um período.
- (GET) ´/leitura/dia´ - Lista as leituras filtradas por um único dia.
- (POST) ´/leitura´ - Faz uma leitura.

## Referências

- http://expressjs.com
- https://sequelize.org/docs/v6/
