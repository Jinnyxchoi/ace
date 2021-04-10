import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_LIST = 'GET_LIST'
const POST_TASK = 'POST_TASK'
const UPDATE_COMPLETE = 'UPDATE_COMPLETE'
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
const postTask = newTask => ({
  type: POST_TASK,
  newTask
})
const completed = list => ({
  type: UPDATE_COMPLETE,
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
      dispatch(postTask(data))
    } catch (error) {
      console.log('there was an error in postTaskThunk')
    }
  }
}

export const updateCompletedThunk = (listID, taskID, complete) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/todo/${listID}/${taskID}`, complete)
      dispatch(completed(data))
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
      return {
        ...state,
        listItems: [...state.listItems, action.newTask]
      }
    case UPDATE_COMPLETE:
      return {
        ...state,
        listItems: state.listItems.map(list => {
          if (list.id === action.list.id) {
            return {...list, completed: action.list.completed}
          } else {
            return list
          }
        })
      }

    default:
      return state
  }
}
