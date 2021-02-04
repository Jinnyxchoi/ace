const router = require('express').Router()
const {Event} = require('../db/models')
module.exports = router

router.get('/:month', async (req, res, next) => {
  try {
    console.log('going in to api')
    const allEvents = await Event.findAll()
    res.json(allEvents)
  } catch (error) {
    next(error)
  }
})
