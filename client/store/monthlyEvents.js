import axios from 'axios'

const GET_EVENTS = 'GET_EVENTS'
const POST_EVENT = 'POST_EVENT'

let initialState = {}

const getAllEvents = events => ({
  type: GET_EVENTS,
  events
})
const postEvent = events => ({
  type: POST_EVENT,
  events
})

export const fetchAllEvents = (date, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/event/${date}/${userId}`)

      let hash = {}
      for (let i = 0; i < data.length; i++) {
        const dayNumber = Number(data[i].eventDate.split('-')[2])

        if (!(dayNumber in hash)) {
          hash[dayNumber] = true
        }
      }
      console.log('hash', hash)
      dispatch(getAllEvents(hash))
    } catch (error) {
      console.log('there was an error in fetchAllEvents')
    }
  }
}

export const postEventThunk = (eventObj, currentMonth) => {
  return async dispatch => {
    try {
      await axios.post(`/api/event`, eventObj)

      const {data} = await axios.get(
        `/api/event/${currentMonth}/${eventObj.userId}`
      )

      let hash = {}
      for (let i = 0; i < data.length; i++) {
        const dayNumber = Number(data[i].eventDate.split('-')[2])

        if (!(dayNumber in hash)) {
          hash[dayNumber] = true
        }
      }

      dispatch(postEvent(hash))
    } catch (error) {
      console.log('there was an error in postEventsThunk')
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events
    case POST_EVENT:
      return action.events
    default:
      return state
  }
}
