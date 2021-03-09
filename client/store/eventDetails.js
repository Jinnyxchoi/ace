import axios from 'axios'

let initialState = []
const GET_EVENT_DETAILS = 'GET_EVENT_DETAIL'

const POST_EVENT_DETAILS = 'POST_EVENT_DETAILS'

const getAllEventDetails = events => ({
  type: GET_EVENT_DETAILS,
  events
})

const getNewEvent = event => ({
  type: POST_EVENT_DETAILS,
  event
})

export const postUpcoming = obj => {
  return dispatch => {
    try {
      const newObj = {
        event: obj.event,
        eventDate: obj.eventDate
      }
      dispatch(getNewEvent(newObj))
    } catch (error) {
      console.log('there was an error in postUpcoming')
    }
  }
}

export const fetchAllEventDetails = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/event/all/${userId}`)

      await data.sort((a, b) => a.eventDate - b.eventDate)

      dispatch(getAllEventDetails(data))
    } catch (error) {
      console.log('there was an error in fetchAllEventDetails')
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENT_DETAILS:
      return action.events
    case POST_EVENT_DETAILS:
      return [...state, action.event]
    default:
      return state
  }
}
