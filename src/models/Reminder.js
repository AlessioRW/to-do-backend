const { Model, DataTypes } = require("sequelize");
const db = require("../db/db");
const newID = require("../utility/snowflake");

class Reminder extends Model {}

Reminder.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => newID().toString(),
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    important: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize: db }
);

module.exports = Reminder;
