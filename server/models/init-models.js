import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Altitude from "./Altitude.js";
import _DirecaoVento from "./DirecaoVento.js";
import _Leitura from "./Leitura.js";
import _Precipitacao from "./Precipitacao.js";
import _Pressao from "./Pressao.js";
import _Temperatura from "./Temperatura.js";
import _UmidadeRelativa from "./UmidadeRelativa.js";
import _UmidadeSolo from "./UmidadeSolo.js";
import _VelocidadeVento from "./VelocidadeVento.js";

export default function initModels(sequelize) {
  const Altitude = _Altitude.init(sequelize, DataTypes);
  const DirecaoVento = _DirecaoVento.init(sequelize, DataTypes);
  const Leitura = _Leitura.init(sequelize, DataTypes);
  const Precipitacao = _Precipitacao.init(sequelize, DataTypes);
  const Pressao = _Pressao.init(sequelize, DataTypes);
  const Temperatura = _Temperatura.init(sequelize, DataTypes);
  const UmidadeRelativa = _UmidadeRelativa.init(sequelize, DataTypes);
  const UmidadeSolo = _UmidadeSolo.init(sequelize, DataTypes);
  const VelocidadeVento = _VelocidadeVento.init(sequelize, DataTypes);

  Altitude.belongsTo(Leitura, { as: "leitura", foreignKey: "leituraId" });
  Leitura.hasMany(Altitude, { as: "Altitude", foreignKey: "leituraId" });
  DirecaoVento.belongsTo(Leitura, { as: "leitura", foreignKey: "leituraId" });
  Leitura.hasMany(DirecaoVento, {
    as: "DirecaoVento",
    foreignKey: "leituraId",
  });
  Precipitacao.belongsTo(Leitura, { as: "leitura", foreignKey: "leituraId" });
  Leitura.hasMany(Precipitacao, {
    as: "Precipitacao",
    foreignKey: "leituraId",
  });
  Pressao.belongsTo(Leitura, { as: "leitura", foreignKey: "leituraId" });
  Leitura.hasMany(Pressao, { as: "Pressao", foreignKey: "leituraId" });
  Temperatura.belongsTo(Leitura, { as: "leitura", foreignKey: "leituraId" });
  Leitura.hasMany(Temperatura, { as: "Temperatura", foreignKey: "leituraId" });
  UmidadeRelativa.belongsTo(Leitura, {
    as: "leitura",
    foreignKey: "leituraId",
  });
  Leitura.hasMany(UmidadeRelativa, {
    as: "UmidadeRelativa",
    foreignKey: "leituraId",
  });
  UmidadeSolo.belongsTo(Leitura, { as: "leitura", foreignKey: "leituraId" });
  Leitura.hasMany(UmidadeSolo, { as: "UmidadeSolo", foreignKey: "leituraId" });
  VelocidadeVento.belongsTo(Leitura, {
    as: "leitura",
    foreignKey: "leituraId",
  });
  Leitura.hasMany(VelocidadeVento, {
    as: "VelocidadeVento",
    foreignKey: "leituraId",
  });

  return {
    Altitude,
    DirecaoVento,
    Leitura,
    Precipitacao,
    Pressao,
    Temperatura,
    UmidadeRelativa,
    UmidadeSolo,
    VelocidadeVento,
  };
}
