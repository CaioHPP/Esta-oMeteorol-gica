import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Temperatura extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    sensor: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    valor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unidade: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ordemGrandeza: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    leituraId: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Leitura',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Temperatura',
    timestamps: false
  });
  }
}
