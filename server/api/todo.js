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
    const allItems = await ListItem.findAll({
      where: {
        listId: +req.params.id
      }
    })
    res.json(allItems)
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
