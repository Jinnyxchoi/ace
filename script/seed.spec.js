'use strict'
/* global describe it */

const seed = require('./seed')

const {Event} = require('../server/db/models')
const {List} = require('../server/db/models')
const {expect} = require('chai')

describe('seed script', () => {
  beforeEach(seed)
  it('creates at least 3 events', async () => {
    const events = await Event.findAll()
    expect(events).to.have.lengthOf.at.least(3)
  })
  it('creates at least 3 lists', async () => {
    const lists = await List.findAll()
    expect(lists).to.have.lengthOf.at.least(3)
  })
})
