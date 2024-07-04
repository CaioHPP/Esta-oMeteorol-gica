# Javascript Express Sequelize SQLite Server

This is a basic server in Node.js, which uses Express (web framework), Sequelize (ORM), and SQLite (database) to run a Weather Station via localhost. The developed frontend uses ChartJS and MomentJS for data visualization.
The data is captured in a weather station developed using a Raspberry Pi 1, so the server is capable of being used on ARM32 machines. The captured readings include Temperature, Pressure, Relative Humidity, Soil Relative Humidity, Wind Direction and Speed, Precipitation, and Altitude.

## To run the project

First, clone the project

```shell
git clone https://github.com/CaioHPP/EstacaoMeteorologica.git
```

Then, install the dependencies

```shell
cd client && yarn install
cd server && yarn install
```

- Start the server

```shell
cd server && node src/index.js
```

Then, test the database connection and initialize the tables by making a GET request to each of the lines below

```shell
localhost:3001/test
localhost:3001/sync
```

If you need to recreate the model files, just run the following command

```shell
yarn sequelize-auto -o "./models" -e sqlite -l esm -c ./config/config.json -T _prisma_migrations
```

**CAUTION** `/sync` does DROP and CREATE of the tables, clearing all data

- Initialize the page.

This can be done using Live Server or using Serve with the following command:

```shell
cd client && yarn serve
```

## Function populateDB

To test the application with randomly generated data between the dates of 26/05/2022 to 01/06/2022, make a GET request to the following URL:

```shell
localhost:3001/popularDB
```

## Server routes

- (GET) ´/leitura/recentes´ - Lists the last 30 readings.
- (GET) ´/leitura/filtrado´ - Lists the readings filtered by a period.
- (GET) ´/leitura/dia´ - Lists the readings filtered by a single day.
- (POST) ´/leitura´ - Makes a reading.

## References

- http://expressjs.com
- https://sequelize.org/docs/v6/
