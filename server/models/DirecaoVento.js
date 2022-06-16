import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class DirecaoVento extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Leitura',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'DirecaoVento',
    timestamps: false
  });
  }
}
