import _sequelize from "sequelize";
import moment from "moment";

const { Model, Sequelize } = _sequelize;

export default class Leitura extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        createdAt: {
          type: "TIMESTAMP",
          defaultValue: moment.utc().format("x"),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Leitura",
        timestamps: false,
      }
    );
  }
}
