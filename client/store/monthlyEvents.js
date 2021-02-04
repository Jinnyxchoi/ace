import axios from 'axios'

const GET_EVENTS = 'GET_EVENTS'

let initialState = {}

const getAllEvents = events => ({
  type: GET_EVENTS,
  events
})

export const fetchAllEvents = date => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/event/${date}`)
      console.log('LOOKAT DATE', date)

      let hash = {}
      for (let i = 0; i < data.length; i++) {
        if (!(data[i].eventDate in hash)) {
          hash[data[i].eventDate] = true
        }
      }
      console.log('hash', hash)
      dispatch(getAllEvents(hash))
    } catch (error) {
      console.log('there was an error in fetchAllEvents')
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events
    default:
      return state
  }
}
