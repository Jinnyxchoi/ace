import React from 'react'
import moment from 'moment'
import CalendarTable from './CalendarTable'
export default class Calendar extends React.Component {
  weekdayshort = moment.weekdaysShort()

  state = {
    showCalendarTable: true,
    showMonthTable: false,
    dateObject: moment(),
    allmonths: moment.months(),
    showYearNav: false,
    selectedDay: null
  }
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth()
  }
  year = () => {
    return this.state.dateObject.format('Y')
  }
  currentDay = () => {
    return this.state.dateObject.format('D')
  }
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject
    let firstDay = moment(dateObject)
      .startOf('month')
      .format('d') // Day of week 0...1..5...6
    return firstDay
  }

  showMonth = () => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
      showCalendarTable: !this.state.showCalendarTable
    })
  }
  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month)
    let dateObject = Object.assign({}, this.state.dateObject)
    dateObject = moment(dateObject).set('month', monthNo)
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showCalendarTable: !this.state.showCalendarTable
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
            this.setMonth(data)
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

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Month</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    )
  }
  showYearEditor = () => {
    this.setState({
      showYearNav: true,
      showCalendarTable: !this.state.showCalendarTable
    })
  }

  onPrev = () => {
    let curr = ''
    if (this.state.showMonthTable == true) {
      curr = 'year'
    } else {
      curr = 'month'
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr)
    })
  }
  onNext = () => {
    let curr = ''
    if (this.state.showMonthTable == true) {
      curr = 'year'
    } else {
      curr = 'month'
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr)
    })
  }

  onYearChange = e => {
    this.setYear(e.target.value)
  }

  onDayClick = (e, d) => {
    this.setState(
      {
        selectedDay: d
      },
      () => {
        console.log('SELECTED DAY: ', this.state.selectedDay)
      }
    )
  }
  render() {
    let weekdayshortname = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>
    })
    let blanks = []
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty" />)
    }
    let daysInMonth = []
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? 'today' : ''
      // let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span
            onClick={e => {
              this.onDayClick(e, d)
            }}
          >
            {d}
          </span>
        </td>
      )
    }
    var totalSlots = [...blanks, ...daysInMonth]
    let rows = []
    let cells = []

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row)
      } else {
        rows.push(cells)
        cells = []
        cells.push(row)
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells)
      }
    })

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>
    })

    return (
      <div className="calendar-component">
        <CalendarTable
          {...this.state}
          weekdayshortname={weekdayshortname}
          daysinmonth={daysinmonth}
        />
      </div>
    )
  }
}
