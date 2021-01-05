const router = require('express').Router()
const {List} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allLists = await List.findAll()
    res.json(allLists)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newList = await List.create(req.body)
    res.json(newList)
  } catch (error) {
    next(error)
  }
})
