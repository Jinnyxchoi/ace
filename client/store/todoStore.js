import axios from 'axios'

/**
 * ACTION TYPES
 */
const POST_NEW_LIST = 'POST_NEW_LIST'
const SET_LISTS = 'SET_LISTS'

/**
 * INITIAL STATE
 */
let initialState = []
/**
 * ACTION CREATORS
 */
const getNewList = newList => ({type: POST_NEW_LIST, newList})

const setLists = lists => ({
  type: SET_LISTS,
  lists
})

/**
 * THUNK CREATORS
 */
export const newListThunk = (name, description, userId) => {
  return async dispatch => {
    try {
      let obj = {
        name,
        description,
        userId
      }

      const {data} = await axios.post('/api/todo', obj)
      console.log('data', data)
      dispatch(getNewList(data))
    } catch (error) {
      console.log('there was an error in fetchCampuses')
    }
  }
}
export const fetchLists = userID => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/todo/lists/${userID}`)
      dispatch(setLists(data))
    } catch (error) {
      console.log('there was an error in fetchLists')
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LISTS:
      return [action.lists][0]
    case POST_NEW_LIST:
      return [...state, action.newList]
    default:
      return state
  }
}
