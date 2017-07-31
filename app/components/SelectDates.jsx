import React, { Component } from 'react'
import { connect } from 'react-redux'

import { convertMonth } from '../utils'
import { setWeeks } from '../reducers/weeks'

import DatePicker from 'material-ui/DatePicker'

class SelectDates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null
    }
  }

  selectStartDate = (e, date) => this.setState({ startDate: date })

  selectEndDate = (e, date) => {
    this.setState({ endDate: date })
    this.saveWeeks()
  }

  saveWeeks = () => {
    let startDate = this.state.startDate, endDate = this.state.endDate
    startDate.setDate(startDate.getDate() - startDate.getDay())
    endDate.setDate(endDate.getDate() - endDate.getDay())
    const weeksArr = []
    for (let week = startDate; week <= endDate; week.setDate(week.getDate() + 7)) {
      weeksArr.push({'date': `${convertMonth(week.getMonth())} ${week.getDate()}`})
    }
    this.props.setWeeks(weeksArr)
  }

  render() {
    return (
      <div>
        <DatePicker
          firstDayOfWeek={0}
          hintText='Set Start Date'
          value={this.state.startDate}
          onChange={this.selectStartDate}
          autoOk={true}
        />
        <DatePicker
          firstDayOfWeek={0}
          hintText='Set End Date'
          value={this.state.startDate}
          onChange={this.selectEndDate}
          autoOk={true}
        />
      </div>
    )
  }
}

export default connect(null, {setWeeks})(SelectDates)
