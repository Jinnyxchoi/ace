const router = require('express').Router()
const {Event} = require('../db/models')
const {Op} = require('sequelize')

module.exports = router

router.get('/:month/:userID', async (req, res, next) => {
  try {
    console.log('going in to api')
    const startDate = new Date(2021, req.params.month, 1)
    const endDate = new Date(2021, req.params.month, 31)

    const allEvents = await Event.findAll({
      where: {
        userId: +req.params.userID,
        eventDate: {
          [Op.between]: [startDate, endDate]
        }
      }
    })
    res.json(allEvents)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const allEvents = await Event.create(req.body)
    res.json(allEvents)
  } catch (error) {
    next(error)
  }
})
