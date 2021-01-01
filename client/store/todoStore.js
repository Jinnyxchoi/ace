import axios from 'axios'

/**
 * ACTION TYPES
 */
const POST_NEW_LIST = 'POST_NEW_LIST'

/**
 * INITIAL STATE
 */
let initialState = {}
/**
 * ACTION CREATORS
 */
const getNewList = newList => ({type: POST_NEW_LIST, newList})

/**
 * THUNK CREATORS
 */
export const newListThunk = listObj => async dispatch => {
  try {
    const res = await axios.put(`/api/newList`, listObj)
    dispatch(getNewList(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case POST_NEW_LIST:
      return action.newList
    default:
      return state
  }
}
