import React from 'react'
import ControlledPopup from './ControlledPopup'

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
    return (
      <div>
        <ControlledPopup />
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
