const Sequelize = require('sequelize')
const db = require('../db')

const List = db.define('list', {
  name: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
})
module.exports = List
