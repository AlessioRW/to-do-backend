const {Sequelize, DataTypes} = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './list_table.sqlite',
    logging: false

})

module.exports = db