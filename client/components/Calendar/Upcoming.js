import React from 'react'
import {fetchAllEventDetails} from '../../store/eventDetails'
import {connect} from 'react-redux'

class Upcoming extends React.Component {
  componentDidMount() {
    console.log('going into upcoming')
    this.props.fetch(this.props.userID)
  }

  render() {
    const eventDetails = this.props.eventDetails
    const eventDate =
      eventDetails.length > 0
        ? new Date(eventDetails[1].eventDate).getDate()
        : ''

    const eventMonth =
      eventDetails.length > 0
        ? new Date(eventDetails[1].eventDate).getMonth() + 1
        : ''
    console.log('eventDate', eventDate, eventMonth)
    return (
      <div>
        <p>Your Upcoming Events</p>
        <p>
          {eventMonth}/{eventDate}
        </p>
      </div>
    )
  }
}

const mapState = state => ({
  userID: state.user.id,
  eventDetails: state.eventDetails
})

const mapDispatch = dispatch => ({
  fetch: userID => dispatch(fetchAllEventDetails(userID))
})

export default connect(mapState, mapDispatch)(Upcoming)
