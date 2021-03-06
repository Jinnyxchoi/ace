import {expect} from 'chai'
import store from './index'
import {setLists} from './todoStore'

describe('Todo list redux', () => {
  const data = [
    {
      name: 'Hiking Locations',
      descriptions: 'list of hiking spots in LA'
    }
  ]
  it('returns initial state by default', () => {
    store.dispatch({type: ''})
    expect(store.getState().todo).to.be.an('array')
  })

  it('SET_LISTS sets lists', () => {
    store.dispatch(setLists(data))
    expect(store.getState().todo).to.equal(data)
    expect(store.getState().todo[0].name).to.equal('Hiking Locations')
  })
})
