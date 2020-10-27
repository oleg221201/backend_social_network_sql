const Sequalize = require("sequelize")
const config = require('config')

const sequelize = new Sequalize(config.get("dbURL"))

module.exports = sequelize