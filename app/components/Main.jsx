import React, { Component } from 'react'
import { connect } from 'react-redux'

import Calendar from './Calendar'
import Messages from './Messages'
import Goal from './Goal'
import Week from './Week'

import { setWeeks, updateWeek, deleteWeek, addWeek } from '../reducers/weeks'
import { loadMessages, sendMessage, markAsRead } from '../reducers/messages'
import { setGoal } from '../reducers/goals'
import { setWeek } from '../reducers/week'
import { convertMonth } from '../utils'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weekDialog: false,
      goalDialog: false,
      month: '',
      goal: '',
      week: '',
      workout1: '',
      workout2: '',
      workout3: '',
      ows: '',
      weekId: null,
      drawer: false,
      text: ''
    }
  }

  openWeekEditor = week => {
    this.setState({ weekDialog: true, week: week.date, workout1: week.workout1, workout2: week.workout2, workout3: week.workout3, ows: week.ows, weekId: week.id })
  }

  closeWeekEditor = () => this.setState({ weekDialog: false })

  openGoalEditor = month => {
    this.setState({ goalDialog: true, month: month })
  }

  closeGoalEditor = () => this.setState({ goalDialog: false })

  setGoal = e => this.setState({ goal: e.target.value })

  saveGoal = () => {
    const goal = { month: this.state.month, goal: this.state.goal }
    this.props.setGoal(goal)
    this.closeGoalEditor()
  }

  findGoal = month => this.props.goals.find(goal => goal.month === month)

  workout1Change = (event, index, value) => this.setState({workout1: value})

  workout2Change = (event, index, value) => this.setState({workout2: value})

  workout3Change = (event, index, value) => this.setState({workout3: value})

  owsChange = e => this.setState({ ows: e.target.value })

  saveWorkout = () => {
    this.closeWeekEditor()
    this.props.updateWeek(this.state.weekId, { workout1: this.state.workout1, workout2: this.state.workout2, workout3: this.state.workout3, ows: this.state.ows })
  }

  newWeek = () => {
    let nextWeek = new Date(`${this.props.weeks[this.props.weeks.length - 1].date}, 2017 00:00:00`)
    nextWeek.setDate(nextWeek.getDate() + 7)
    this.props.addWeek({'date': `${convertMonth(nextWeek.getMonth())} ${nextWeek.getDate()}`})
  }

  openMessages = weekId => {
    this.props.setWeek(weekId)
    this.props.loadMessages(weekId)
    this.props.markAsRead(weekId)
    this.setState({ drawer: true })
  }

  closeMessages = () => this.setState({ drawer: false })

  textChange = e => this.setState({ text: e.target.value })

  newMessage = () => {
    const name = this.props.coach ? 'Abby' : 'Barbara'
    this.props.sendMessage(this.props.currentWeek, { name: name, text: this.state.text, weekId: this.props.currentWeek, read: false })
    this.setState({ text: '' })
  }

  render() {
    const months = Array.from(new Set(this.props.weeks.map(week => week.date.split(' ')[0])))
    return (
      <div>
        <Calendar months={months} coach={this.props.coach} weeks={this.props.weeks} newWeek={this.newWeek} deleteWeek={this.props.deleteWeek} openWeekEditor={this.openWeekEditor} openMessages={this.openMessages} openGoalEditor={this.openGoalEditor} findGoal={this.findGoal} />
        <Messages drawer={this.state.drawer} close={this.closeMessages} newMessage={this.newMessage} text={this.state.text} textChange={this.textChange} messages={this.props.messages} />
        <Goal closeGoalEditor={this.closeGoalEditor} saveGoal={this.saveGoal} month={this.state.month} goalDialog={this.state.goalDialog} findGoal={this.findGoal} setGoal={this.setGoal} />
        <Week closeWeekEditor={this.closeWeekEditor} saveWorkout={this.saveWorkout} week={this.state.week} weekDialog={this.state.weekDialog} ows={this.state.ows} owsChange={this.owsChange} workout1={this.state.workout1} workout2={this.state.workout2} workout3={this.state.workout3} workout1Change={this.workout1Change} workout2Change={this.workout2Change} workout3Change={this.workout3Change} />
      </div>
    )
  }
}

const mapState = ({ messages, currentWeek, weeks, goals, coach }) => ({ messages, currentWeek, weeks, goals, coach })

export default connect(mapState, { setWeeks, setGoal, updateWeek, deleteWeek, addWeek, loadMessages, setWeek, sendMessage, markAsRead })(Main)
