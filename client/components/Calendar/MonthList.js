import React from 'react'
import ControlledPopup from './ControlledPopup'

export default class MonthList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonClicked: false
    }
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
    props.data.map((data, i) => {
      months.push(
        <td
          key={i}
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
      return <tr key={i}>{d}</tr>
    })
    return monthlist
  }

  render() {
    return (
      <div className="calendar-buttons">
        <ControlledPopup dateObject={this.props.dateObject} />
        <button onClick={this.handleClick} type="submit">
          change month
        </button>
        <table className="calendar-month">
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
