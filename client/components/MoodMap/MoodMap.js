import CalendarHeatmap from 'react-calendar-heatmap'
import React from 'react'

export const MoodMap = () => {
  return (
    <div className="calendar-heatmap">
      <h2 className="calendar-heading">🌼YOUR MOOD MAP🌼</h2>
      <div className="heatmap-component">
        <CalendarHeatmap
          startDate={new Date('2021-01-01')}
          endDate={new Date('2021-12-30')}
          values={[
            {date: '2016-01-01'},
            {date: '2016-01-22'},
            {date: '2016-01-30'}
          ]}
        />
      </div>
    </div>
  )
}
