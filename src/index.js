import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(express.json());

app.get("/leitura", async (req, res) => {
  const leitura = await prisma.leitura.findMany(
    {
      limit: 10,
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
    },
    {
      orderBy: {
        id: "desc",
      },
    }
  );
  res.json(leitura);
});

/* SE HOUVER REDUNDANCIA DE SENSORES, 
DEVE-SE RETIRAR O ARRAY.OF() */

app.post("/leitura", async (req, res) => {
  const leitura = await prisma.leitura.create({
    data: {},
  });

  req.query.temperatura.forEach(async (temp) => {
    const aux = temp.split("$");
    await prisma.temperatura.create({
      data: {
        sensor: aux[0],
        valor: parseInt(aux[1]),
        unidade: aux[2],
        ordemGrandeza: parseInt(aux[3]),
        leituraId: leitura.id,
      },
    });
  });

  Array.of(req.query.pressao).forEach(async (press) => {
    const aux = press.split("$");
    await prisma.pressao.create({
      data: {
        sensor: aux[0],
        valor: parseInt(aux[1]),
        unidade: aux[2],
        ordemGrandeza: parseInt(aux[3]),
        leituraId: leitura.id,
      },
    });
  });

  Array.of(req.query.altitude).forEach(async (alt) => {
    const aux = alt.split("$");
    await prisma.altitude.create({
      data: {
        sensor: aux[0],
        valor: parseInt(aux[1]),
        unidade: aux[2],
        ordemGrandeza: parseInt(aux[3]),
        leituraId: leitura.id,
      },
    });
  });

  Array.of(req.query.velocidadevento).forEach(async (vel) => {
    const aux = vel.split("$");
    await prisma.velocidadeVento.create({
      data: {
        sensor: aux[0],
        media: parseInt(aux[1]),
        maximo: parseInt(aux[2]),
        unidade: aux[3],
        ordemGrandeza: parseInt(aux[4]),
        leituraId: leitura.id,
      },
    });
  });

  Array.of(req.query.direcaovento).forEach(async (dir) => {
    const aux = dir.split("$");
    await prisma.direcaoVento.create({
      data: {
        sensor: aux[0],
        valor: parseInt(aux[1]),
        unidade: aux[2],
        ordemGrandeza: parseInt(aux[3]),
        leituraId: leitura.id,
      },
    });
  });

  Array.of(req.query.precipitacao).forEach(async (prec) => {
    const aux = prec.split("$");
    await prisma.precipitacao.create({
      data: {
        sensor: aux[0],
        valor: parseInt(aux[1]),
        unidade: aux[2],
        ordemGrandeza: parseInt(aux[3]),
        leituraId: leitura.id,
      },
    });
  });

  Array.of(req.query.umidadesolo).forEach(async (umisolo) => {
    const aux = umisolo.split("$");
    await prisma.umidadeSolo.create({
      data: {
        sensor: aux[0],
        valor: parseInt(aux[1]),
        unidade: aux[2],
        ordemGrandeza: parseInt(aux[3]),
        leituraId: leitura.id,
      },
    });
  });

  Array.of(req.query.umidaderelativa).forEach(async (umirel) => {
    const aux = umirel.split("$");
    await prisma.umidadeRelativa.create({
      data: {
        sensor: aux[0],
        valor: parseInt(aux[1]),
        unidade: aux[2],
        ordemGrandeza: parseInt(aux[3]),
        leituraId: leitura.id,
      },
    });
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

  res.json(leituraFinal);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//http://localhost:3000/leitura?temperatura=BMP180$260$ºC$2&temperatura=DHT11$220$ºC$2&temperatura=Ferrinho$243$ºC$2&pressao=BMP180$180$hPa$2&altitude=BMP180$5958$m$3&velocidadevento=anem$10$6$m/s$2&direcaovento=anem$180$º$3&precipitacao=pluv$25$mm$2&umidadesolo=umisolo$650$%$2&umidaderelativa=umiar$125$%$2
