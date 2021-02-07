import React, {Component} from 'react'

export default class UpcomingEvent extends Component {
  render() {
    const eventDate = new Date(this.props.event.eventDate).getDate()

    const eventMonth = new Date(this.props.event.eventDate).getMonth() + 1

    return (
      <div className="specific-event">
        <p>
          <b>
            {eventMonth}/{eventDate}
          </b>
          : {this.props.event.event}
        </p>
      </div>
    )
  }
}
