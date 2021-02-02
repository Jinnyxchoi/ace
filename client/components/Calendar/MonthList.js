import React from 'react'
import moment from 'moment'

export default class MonthList extends React.Component {
  // setMonth = (month) => {
  //   let monthNo = this.state.allmonths.indexOf(month)
  //   let dateObject = Object.assign({}, this.state.dateObject)
  //   dateObject = moment(dateObject).set('month', monthNo)
  //   this.setState({
  //     dateObject: dateObject,
  //     showMonthTable: !this.state.showMonthTable,
  //     showCalendarTable: !this.state.showCalendarTable,
  //   })
  // }
  MonthList = props => {
    let months = []
    props.data.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.props.setMonth(data)
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
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Month</th>
          </tr>
        </thead>
        <tbody>{this.MonthList(this.props)}</tbody>
      </table>
    )
  }
}
