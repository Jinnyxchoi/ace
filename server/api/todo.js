const router = require('express').Router()
const {List, ListItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allLists = await List.findAll({
      include: {
        model: ListItem
      }
    })
    res.json(allLists)
  } catch (error) {
    next(error)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const list = await List.findOne({
      where: {
        id: +req.params.id
      },
      include: {
        model: ListItem
      }
    })
    res.json(list)
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

router.post('/:id', async (req, res, next) => {
  try {
    console.log('in here')
    await ListItem.create(req.body)
    const list = await List.findOne({
      where: {
        id: +req.params.id
      },
      include: {
        model: ListItem
      }
    })
    res.json(list)
  } catch (error) {
    next(error)
  }
})
