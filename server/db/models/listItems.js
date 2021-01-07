const Sequelize = require('sequelize')
const db = require('../db')

const ListItem = db.define('listItem', {
  todo: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  }
})
module.exports = ListItem
