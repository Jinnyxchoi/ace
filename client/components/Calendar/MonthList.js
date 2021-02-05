import React from 'react'
import Popup from 'reactjs-popup'

export default class MonthList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonClicked: false
    }
    // this.handleClick = this.handleClick.bind(this)
  }
  handleSubmit = evt => {
    evt.preventDefault()
    console.log(evt.target.date.value)
    console.log(evt.target.eventname.value)
  }
  handleClick = evt => {
    evt.preventDefault()
    this.setState({
      buttonClicked: true
    })
  }
  monthSelected = data => {
    this.props.setMonth(data)
    this.setState({
      buttonClicked: false
    })
  }
  MonthList = props => {
    let months = []
    props.data.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.monthSelected(data)
          }}
        >
          <span>{data}</span>
        </td>
      )
    })
    let rows = []
    let cells = []

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row)
      } else {
        rows.push(cells)
        cells = []
        cells.push(row)
      }
    })
    rows.push(cells)
    let monthlist = rows.map((d, i) => {
      return <tr>{d}</tr>
    })
    return monthlist
  }

  render() {
    console.log('STATE', this.state)
    return (
      <div>
        <Popup trigger={<button className="button"> Add Event </button>} modal>
          <div className="modal">
            <span>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor="date">
                    <small>Event Date</small>
                  </label>
                  <input type="date" id="date" />
                </div>
                <div>
                  <label htmlFor="eventname">
                    <small>Event Name</small>
                  </label>
                  <input name="eventname" type="text" />
                </div>
                <button type="submit">Submit</button>
              </form>
            </span>
          </div>
        </Popup>
        <button onClick={this.handleClick} type="submit">
          change month
        </button>
        <table className="calendar-month">
          {/* <thead> */}

          {/* </thead> */}
          {this.state.buttonClicked ? (
            <tbody>{this.MonthList(this.props)}</tbody>
          ) : (
            <tbody />
          )}
        </table>{' '}
      </div>
    )
  }
}
