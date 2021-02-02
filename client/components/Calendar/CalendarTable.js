import React from 'react'
import moment from 'moment'
import YearTable from './YearTable'
import MonthList from './MonthList'

export default class Calendar extends React.Component {
  render() {
    return (
      <div className="tail-datetime-calendar">
        <div className="calendar-navi">
          <span
            onClick={e => {
              this.onPrev()
            }}
            className="calendar-button button-prev"
          />
          <span onClick={this.showMonth} className="calendar-label">
            {`${this.props.dateObject.format('MMMM')},  `}
          </span>

          <span className="calendar-label" onClick={this.props.showYearEditor}>
            {this.props.dateObject.format('Y')}
          </span>

          <span
            onClick={e => {
              this.onNext()
            }}
            className="calendar-button button-next"
          />
        </div>
        <div className="calendar-date">
          {this.props.showYearNav && (
            <YearTable
              props={this.props.dateObject.format('Y')}
              {...this.state}
              setYear={this.props.setYear}
            />
          )}
          {this.props.showMonthTable && (
            <MonthList data={moment.months()} setMonth={this.props.setMonth} />
          )}
        </div>

        {this.props.showCalendarTable && (
          <div className="calendar-date">
            <table className="calendar-day">
              <thead>
                <tr>{this.props.weekdayshortname}</tr>
              </thead>
              <tbody>{this.props.daysinmonth}</tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}
