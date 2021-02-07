import axios from 'axios'

const GET_EVENT_DETAILS = 'GET_EVENT_DETAIL'
let initialState = []

const getAllEventDetails = events => ({
  type: GET_EVENT_DETAILS,
  events
})

export const fetchAllEventDetails = userId => {
  return async dispatch => {
    try {
      console.log('going into even/all')
      const {data} = await axios.get(`/api/event/all/${userId}`)

      console.log('data', data)
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
    default:
      return state
  }
}
