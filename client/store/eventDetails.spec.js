import {expect} from 'chai'
import store from './index'
import {postUpcoming} from './eventDetails'

describe('event details redux', () => {
  const data = [
    {
      event: 'Some new event',
      eventDate: new Date()
    }
  ]
  it('returns initial state by default', () => {
    store.dispatch({type: ''})
    expect(store.getState().eventDetails).to.be.an('array')
    // expect(store.getState().eventDetails[0].event).to.equal('Some new event')
  })

  it('postUpcoming function adds the new event in our state.', () => {
    store.dispatch(
      postUpcoming({
        event: 'Some new event',
        eventDate: new Date()
      })
    )
    expect(store.getState().eventDetails[0].event).to.equal('Some new event')
  })
})
