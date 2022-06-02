import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(express.json());

app.get("/leitura", async (req, res) => {
  const leitura = await prisma.leitura.findMany();
  res.json(leitura);
});

app.post("/leitura", async (req, res) => {
  const leitura = await prisma.leitura.create({
    data: {},
  });
  const temp1 = await prisma.temperatura.create({
    data: {
      sensor: "BMP180",
      valor: 23,
      unidade: "C",
      ordemGrandeza: 1,
      leituraId: leitura.id,
    },
  });
  const temp2 = await prisma.temperatura.create({
    data: {
      sensor: "DHT11",
      valor: 23,
      unidade: "C",
      ordemGrandeza: 1,
      leituraId: leitura.id,
    },
  });

  const Pressao = await prisma.pressao.create({
    data: {
      sensor: "sensor3",
      valor: 23,
      unidade: "hPa",
      ordemGrandeza: 1,
      leituraId: leitura.id,
    },
  });
  const altitude = await prisma.altitude.create({
    data: {
      sensor: "sensor4",
      valor: 23,
      unidade: "m",
      ordemGrandeza: 1,
      leituraId: leitura.id,
    },
  });
  const velocidadevento = await prisma.velocidadeVento.create({
    data: {
      sensor: "sensor5",
      media: 23,
      maximo: 25,
      unidade: "m/s",
      ordemGrandeza: 1,
      leituraId: leitura.id,
    },
  });
  const direcaoVento = await prisma.direcaoVento.create({
    data: {
      sensor: "sensor6",
      valor: 23,
      unidade: "°",
      ordemGrandeza: 1,
      leituraId: leitura.id,
    },
  });
  const precipitacao = await prisma.precipitacao.create({
    data: {
      sensor: "sensor7",
      valor: 23,
      unidade: "mm",
      ordemGrandeza: 1,
      leituraId: leitura.id,
    },
  });
  const umidadeSolo = await prisma.umidadeSolo.create({
    data: {
      sensor: "sensor8",
      valor: 23,
      unidade: "%",
      ordemGrandeza: 1,
      leituraId: leitura.id,
    },
  });
  const umidadeRelativa = await prisma.umidadeRelativa.create({
    data: {
      sensor: "sensor2",
      valor: 23,
      unidade: "%",
      ordemGrandeza: 1,
      leituraId: leitura.id,
    },
  });

  const leituraFinal = await prisma.leitura.findUnique({
    where: {
      id: leitura.id,
    },
    include: {
      Temperatura: true,
      Pressao: true,
      Altitude: true,
      VelocidadeVento: true,
      DirecaoVento: true,
      Precipitacao: true,
      UmidadeSolo: true,
      UmidadeRelativa: true,
    },
  });
  console.log(req.query);
  res.json(leituraFinal);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
