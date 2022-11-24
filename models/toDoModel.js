const { Model, DataTypes } = require('sequelize')
const db = require('../db/db')

class List extends Model {}

List.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER
    }
}, {sequelize: db})

module.exports = List