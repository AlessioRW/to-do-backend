const { Model, DataTypes } = require('sequelize')
const db = require('../db/db')
const newID = require("../server/utility/snowflake");

class Reminder extends Model {}

Reminder.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => newID().toString()
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER
    }
}, { sequelize: db })

module.exports = Reminder