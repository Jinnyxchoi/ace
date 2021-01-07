import axios from 'axios'

//ACTION TYPES
const POST_NEW_ITEM = 'POST_NEW_ITEM'
const SET_ITEMS = 'SET_ITEMS'

//INITIAL STATE
let initialState = []

//ACTION CREATOR
const setListItems = items => ({
  type: SET_ITEMS,
  items
})

//THUNK CREATORS
export const fetchListItems = listId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/todo/${listId}`)
      dispatch(setListItems(data))
    } catch (error) {
      console.log('there was an error in fetchListItems')
    }
  }
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return [action.items][0]
    default:
      return state
  }
}
