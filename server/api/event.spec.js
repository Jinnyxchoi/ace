const {expect} = require('chai')
const db = require('../db')
const app = require('../index')
const agent = require('supertest')(app)
const Event = db.model('event')
const User = db.model('user')

describe('Event Routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    await User.create({
      email: 'cody@puppybook.com',
      password: 'hello'
    })
    await Event.create({
      eventDate: new Date(),
      event: 'Marathon Day',
      userId: 1
    })
    await Event.create({
      eventDate: new Date(2021, 11, 17),
      event: 'Race Day',
      userId: 1
    })
  })
  it('GET /api/event/all/1', async () => {
    const res = await agent.get('/api/event/all/1').expect(200)
    expect(res.body[0].event).to.be.an('string')
    expect(res.body[0].event).to.equal('Marathon Day')
  })
  it('GET /api/event/:month/:userID', async () => {
    const res = await agent.get('/api/event/11/1').expect(200)
    expect(res.body[0].event).to.be.an('string')
    expect(res.body[0].event).to.equal('Race Day')
  })
})
