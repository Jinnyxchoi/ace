import React from 'react'
import {fetchAllEventDetails} from '../../store/eventDetails'
import {connect} from 'react-redux'
import UpcomingEvent from './UpcomingEvent'

class Upcoming extends React.Component {
  componentDidMount() {
    this.props.fetch(this.props.userID)
  }

  render() {
    const eventDetails = this.props.eventDetails

    return (
      <div className="upcoming">
        <h4>Your Events</h4>
        {eventDetails.length > 0 ? (
          <div>
            {eventDetails.map(each => (
              <UpcomingEvent key={each.id} event={each} />
            ))}
          </div>
        ) : (
          <div />
        )}
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
