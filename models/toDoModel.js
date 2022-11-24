const { Model, DataTypes } = require('sequelize')
const db = require('../db/db')

class List extends Model {}

List.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
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

module.exports = List