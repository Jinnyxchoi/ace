import React from 'react'
import moment from 'moment'

export default class Calendar extends React.Component {
  // setYear = (year) => {
  //   let dateObject = Object.assign({}, this.props.dateObject)
  //   dateObject = moment(dateObject).set('year', year)
  //   this.setState({
  //     dateObject: dateObject,
  //     showMonthTable: !this.showMonthTable,
  //     showYearNav: !this.showYearNav,
  //   })
  // }

  getDates(startDate, stopDate) {
    var dateArray = []
    var currentDate = moment(startDate)
    var stopDate = moment(stopDate)
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('YYYY'))
      currentDate = moment(currentDate).add(1, 'year')
    }
    return dateArray
  }
  YearTable = props => {
    let months = []
    let nextten = moment()
      .set('year', props)
      .add('year', 12)
      .format('Y')

    let tenyear = this.getDates(props, nextten)

    tenyear.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.props.setYear(data)
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
    let yearlist = rows.map((d, i) => {
      return <tr>{d}</tr>
    })

    return yearlist
  }
  render() {
    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Year</th>
          </tr>
        </thead>
        <tbody>{this.YearTable(this.props.props)}</tbody>
      </table>
    )
  }
}
