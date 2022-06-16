import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Leitura extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Leitura',
    timestamps: true
  });
  }
}
