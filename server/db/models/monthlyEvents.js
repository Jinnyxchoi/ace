const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  eventDate: {
    type: Sequelize.DATEONLY
  },
  event: {
    type: Sequelize.STRING
  }
})
module.exports = Event
