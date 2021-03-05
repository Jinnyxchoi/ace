import React from 'react'
import moment from 'moment'
import CalendarTable from './CalendarTable'
import {connect} from 'react-redux'
import {fetchAllEvents} from '../../store/monthlyEvents'
import Upcoming from './Upcoming'

class Calendar extends React.Component {
  weekdayshort = moment.weekdaysShort()
  constructor() {
    super()

    this.state = {
      dateObject: moment(),
      allmonths: moment.months(),
      selectedDay: null
    }
  }
  componentDidMount() {
    this.props.loadEvents(
      this.state.dateObject._d.getMonth(),
      this.props.user.id
    )
  }
  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month)
    let dateObject = Object.assign({}, this.state.dateObject)
    dateObject = moment(dateObject).set('month', monthNo)
    this.setState({
      dateObject: dateObject
    })

    this.props.loadEvents(monthNo, this.props.user.id)
  }
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth()
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

  // onPrev = () => {
  //   let curr = ''
  //   if (this.state.showMonthTable == true) {
  //     curr = 'year'
  //   } else {
  //     curr = 'month'
  //   }
  //   this.setState({
  //     dateObject: this.state.dateObject.subtract(1, curr),
  //   })
  // }
  // onNext = () => {
  //   let curr = ''
  //   if (this.state.showMonthTable == true) {
  //     curr = 'year'
  //   } else {
  //     curr = 'month'
  //   }
  //   this.setState({
  //     dateObject: this.state.dateObject.add(1, curr),
  //   })
  // }

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
      blanks.push(<td key={i} className="calendar-day empty" />)
    }
    let daysInMonth = []
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? 'today' : ''

      const task = d in this.props.events

      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span
            onClick={e => {
              this.onDayClick(e, d)
            }}
          >
            {d}
          </span>
          {task ? (
            <p className="tasked">O</p>
          ) : (
            <div className="un-tasked">O</div>
          )}
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
      return <tr key={i}>{d}</tr>
    })

    return (
      <div>
        <h2 className="calendar-heading">🌼YOUR EVENTS🌼</h2>
        <div className="calendar-component">
          <CalendarTable
            {...this.state}
            weekdayshortname={weekdayshortname}
            daysinmonth={daysinmonth}
            setMonth={this.setMonth}
          />
          <Upcoming />
        </div>{' '}
      </div>
    )
  }
}
const mapDispatch = dispatch => ({
  loadEvents: (date, userId) => dispatch(fetchAllEvents(date, userId))
})

const mapState = state => ({
  events: state.monthlyEvents,
  user: state.user
})
export default connect(mapState, mapDispatch)(Calendar)
