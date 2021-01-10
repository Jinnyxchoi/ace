import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_LIST = 'GET_LIST'
const POST_TASK = 'POST_TASK'
/**
 * INITIAL STATE
 */
let initialState = []

/**
 * ACTION CREATORS
 */
const getSingleList = list => ({
  type: GET_LIST,
  list
})
const postTask = list => ({
  type: POST_TASK,
  list
})

/**
 * THUNK CREATORS
 */
export const fetchSingleList = listID => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/todo/${listID}`)
      dispatch(getSingleList(data))
    } catch (error) {
      console.log('there was an error in fetchSingleList')
    }
  }
}

export const postTaskThunk = (listID, task) => {
  return async dispatch => {
    try {
      task = {
        todo: task,
        listId: listID
      }
      const {data} = await axios.post(`/api/todo/${listID}`, task)
      console.log('DATA', data)
      dispatch(postTask(data))
    } catch (error) {
      console.log('there was an error in postTaskThunk')
    }
  }
}

/**
 * REDUCER
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LIST:
      return action.list
    case POST_TASK:
      return action.list
    default:
      return state
  }
}
