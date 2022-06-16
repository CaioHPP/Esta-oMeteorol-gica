import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class VelocidadeVento extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    sensor: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    media: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maximo: {
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
    tableName: 'VelocidadeVento',
    timestamps: false
  });
  }
}
