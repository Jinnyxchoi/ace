const {expect} = require('chai')
const db = require('../db')
const app = require('../index')
const agent = require('supertest')(app)
const List = db.model('list')
const User = db.model('user')

describe('List Routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    await User.create({
      email: 'cody@puppybook.com',
      password: 'hello'
    })
    await List.create({
      name: 'Groceries',
      description: 'Remember to get these items at the market.',
      userId: 1
    })
  })
  it('GET /api/todo', async () => {
    const res = await agent.get('/api/todo/1').expect(200)
    console.log('LOOK', res.body)
    expect(res.body).to.be.an('object')
    expect(res.body.description).to.equal(
      'Remember to get these items at the market.'
    )
    expect(res.body.name).to.equal('Groceries')
  })
})
