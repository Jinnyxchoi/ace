const router = require('express').Router()
const {List, ListItem} = require('../db/models')
module.exports = router

router.get('/lists/:userID', async (req, res, next) => {
  try {
    const allLists = await List.findAll({
      where: {
        userId: +req.params.userID
      },
      include: {
        model: ListItem
      }
    })
    res.json(allLists)
  } catch (error) {
    next(error)
  }
})
router.delete('/lists/:listID', async (req, res, next) => {
  try {
    const list = await List.findByPk(+req.params.listID)
    if (!list) return res.sendStatus(404)
    await list.destroy()
    res.sendStatus(204)
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
    const newTask = await ListItem.create(req.body)
    // const list = await List.findOne({
    //   where: {
    //     id: +req.params.id
    //   },
    //   include: {
    //     model: ListItem
    //   }
    // })
    res.json(newTask)
  } catch (error) {
    next(error)
  }
})
router.put('/:listid/:taskid', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    const task = await ListItem.findOne({
      where: {
        id: +req.params.taskid,
        listId: +req.params.listid
      }
    })
    task.completed = !task.completed
    await task.save()
    res.json(task)
  } catch (error) {
    next(error)
  }
})
