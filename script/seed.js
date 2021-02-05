'use strict'

const db = require('../server/db')
const {User, Event, List, ListItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'demo user', password: '123'})
  ])

  await Promise.all([
    Event.create({
      eventDate: new Date(),
      event: 'WWC conference',
      userId: 3
    }),
    Event.create({
      eventDate: new Date(),
      event: 'Jalapeno Day',
      userId: 3
    }),
    Event.create({
      eventDate: new Date(2021, 11, 17),
      event: 'Launch Day',
      userId: 3
    })
  ])

  await Promise.all([
    List.create({
      name: 'NYC concerts',
      description: 'upcoming concerts to attend',
      userId: 3
    }),
    List.create({
      name: 'Groceries',
      description: 'items to purchase at the market',
      userId: 3
    }),
    List.create({
      name: 'People to contact',
      description: 'Follow up',
      userId: 3
    })
  ])
  await Promise.all([
    ListItem.create({
      todo: 'Red Hot Chili Peppers',
      completed: false,
      listId: 1
    }),
    ListItem.create({
      todo: 'Bluberries',
      completed: false,
      listId: 2
    }),
    ListItem.create({
      todo: 'Kathryn Nguyen',
      completed: false,
      listId: 3
    })
  ])
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
