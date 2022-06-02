-- CreateTable
CREATE TABLE "Leitura" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Temperatura" (
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sensor" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "ordemGrandeza" INTEGER NOT NULL,
    "leituraId" INTEGER NOT NULL 
    CONSTRAINT "Temperatura_leituraId_fkey" FOREIGN KEY ("leituraId") REFERENCES "Leitura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pressao" (
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sensor" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "ordemGrandeza" INTEGER NOT NULL,
    "leituraId" INTEGER NOT NULL 
    CONSTRAINT "Pressao_leituraId_fkey" FOREIGN KEY ("leituraId") REFERENCES "Leitura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Altitude" (
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sensor" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "ordemGrandeza" INTEGER NOT NULL,
    "leituraId" INTEGER NOT NULL 
    CONSTRAINT "Altitude_leituraId_fkey" FOREIGN KEY ("leituraId") REFERENCES "Leitura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VelocidadeVento" (
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sensor" TEXT NOT NULL,
    "media" INTEGER NOT NULL,
    "maximo" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "ordemGrandeza" INTEGER NOT NULL,
    "leituraId" INTEGER NOT NULL 
    CONSTRAINT "VelocidadeVento_leituraId_fkey" FOREIGN KEY ("leituraId") REFERENCES "Leitura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DirecaoVento" (
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sensor" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "ordemGrandeza" INTEGER NOT NULL,
    "leituraId" INTEGER NOT NULL 
    CONSTRAINT "DirecaoVento_leituraId_fkey" FOREIGN KEY ("leituraId") REFERENCES "Leitura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Precipitacao" (
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sensor" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "ordemGrandeza" INTEGER NOT NULL,
    "leituraId" INTEGER NOT NULL 
    CONSTRAINT "Precipitacao_leituraId_fkey" FOREIGN KEY ("leituraId") REFERENCES "Leitura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UmidadeSolo" (
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sensor" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "ordemGrandeza" INTEGER NOT NULL,
    "leituraId" INTEGER NOT NULL 
    CONSTRAINT "UmidadeSolo_leituraId_fkey" FOREIGN KEY ("leituraId") REFERENCES "Leitura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UmidadeRelativa" (
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sensor" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "ordemGrandeza" INTEGER NOT NULL,
    "leituraId" INTEGER NOT NULL 
    CONSTRAINT "UmidadeRelativa_leituraId_fkey" FOREIGN KEY ("leituraId") REFERENCES "Leitura" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
