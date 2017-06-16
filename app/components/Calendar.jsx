import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import Message from 'material-ui/svg-icons/communication/mail-outline'
import Pencil from 'material-ui/svg-icons/content/create'
import Add from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Trash from 'material-ui/svg-icons/action/delete'
import DatePicker from 'material-ui/DatePicker'

import { Messages } from './Messages'
import { convertMonth } from '../utils'
import { setWeeks, updateWeek, deleteWeek, addWeek } from '../reducers/weeks'
import { setGoal } from '../reducers/goals'

const coach = true

class Calendar extends Component {
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
  openWeekEditor = (week) => {
    this.setState({ weekDialog: true, week: week.date, workout1: week.workout1, workout2: week.workout2, workout3: week.workout3, ows: week.ows, weekId: week.id })
  }

  closeWeekEditor = () => this.setState({ weekDialog: false })

  openGoalEditor = month => {
    this.setState({ goalDialog: true, month: month })
  }

  closeGoalEditor = () => this.setState({ goalDialog: false })

  saveGoal = () => {
    this.closeGoalEditor()
    const goal = {month: this.state.month, goal: this.state.goal}
    this.props.setGoal(goal)
  }

  findGoal = (month) => {
    this.props.goals.find(goal => goal.month === month)
  }

  workout1Change = (event, index, value) => this.setState({workout1: value})

  workout2Change = (event, index, value) => this.setState({workout2: value})

  workout3Change = (event, index, value) => this.setState({workout3: value})

  owsChange = e => this.setState({ ows: e.target.value })

  saveWorkout = () => {
    this.closeWeekEditor()
    this.props.updateWeek(this.state.weekId, {workout1: this.state.workout1, workout2: this.state.workout2, workout3: this.state.workout3, ows: this.state.ows})
  }

  newWeek = () => {
    let nextWeek = new Date(`${this.props.weeks[this.props.weeks.length-1].date}, 2017 00:00:00`)
    nextWeek.setDate(nextWeek.getDate() + 7)
    this.props.addWeek({'date': `${convertMonth(nextWeek.getMonth())} ${nextWeek.getDate()}`})
  }

  render() {
    const weeks = this.props.weeks
    const months = Array.from(new Set(weeks.map(week => week.date.split(' ')[0])))
    const weekActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeWeekEditor}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.saveWorkout}
      />
    ]
    const goalActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeGoalEditor}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.saveGoal}
      />
    ]
    if (weeks.length) {
      return (
        <div>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
              <TableRow>
                <TableHeaderColumn>Week</TableHeaderColumn>
                <TableHeaderColumn>Workout #1</TableHeaderColumn>
                <TableHeaderColumn>Workout #2</TableHeaderColumn>
                <TableHeaderColumn>Workout #3</TableHeaderColumn>
                <TableHeaderColumn>Open Water Swims</TableHeaderColumn>
                <TableHeaderColumn>Notes</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
          </Table>
          {months.map(month =>
          <Table>
            <TableHeader displaySelectAll={false} >
              <TableRow >
                <TableHeaderColumn colSpan="3">
                  {`${month} -- Goal: ${this.findGoal(month) ? this.findGoal(month).goal : ''}`}
                  { coach ? <IconButton onTouchTap={() => this.openGoalEditor(month)} ><Pencil /></IconButton> : null }
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {weeks.filter(week => week.date.startsWith(month)).map(week =>
                <TableRow key={week.id} selectable={false} >
                  <TableRowColumn>{week.date}</TableRowColumn>
                  <TableRowColumn>{isNaN(week.workout1) ? week.workout1 : `${week.workout1} minutes`}</TableRowColumn>
                  <TableRowColumn>{isNaN(week.workout2) ? week.workout2 : `${week.workout2} minutes`}</TableRowColumn>
                  <TableRowColumn>{isNaN(week.workout3) ? week.workout3 : `${week.workout3} minutes`}</TableRowColumn>
                  <TableRowColumn>{week.ows}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton onTouchTap={this.openMessages} ><Message /></IconButton>
                  </TableRowColumn>
                  <TableRowColumn>
                    { coach ? <IconButton onTouchTap={() => this.openWeekEditor(week)} ><Pencil /></IconButton> : null }
                    { coach ? <IconButton onTouchTap={() => this.props.deleteWeek(week.id)}><Trash /></IconButton> : null}
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
          )}
          { coach ? <IconButton onTouchTap={this.newWeek} ><Add /></IconButton> : null}
          <Messages />
          <Dialog
            title={this.state.month}
            actions={goalActions}
            modal={true}
            open={this.state.goalDialog}
          >
            <TextField
              floatingLabelText='Goal'
              defaultValue={this.findGoal(this.state.month) ? this.findGoal(this.state.month).goal : ''}
              onChange={e => this.setState({ goal: e.target.value })}
            />
          </Dialog>
          <Dialog
            title={`Week of ${this.state.week}`}
            actions={weekActions}
            modal={true}
            open={this.state.weekDialog}
          >
            <SelectField
              floatingLabelText="Workout #1"
              value={this.state.workout1}
              onChange={this.workout1Change}
              autoWidth={true}
            >
              <MenuItem value={'-'} primaryText="None" />
              <MenuItem value={'30'} primaryText="30 minutes" />
              <MenuItem value={'60'} primaryText="60 minutes" />
              <MenuItem value={'90'} primaryText="90 minutes" />
            </SelectField><br />
            <SelectField
              floatingLabelText="Workout #2"
              value={this.state.workout2}
              onChange={this.workout2Change}
              autoWidth={true}
            >
              <MenuItem value={'-'} primaryText="None" />
              <MenuItem value={'30'} primaryText="30 minutes" />
              <MenuItem value={'60'} primaryText="60 minutes" />
              <MenuItem value={'90'} primaryText="90 minutes" />
            </SelectField><br />
            <SelectField
              floatingLabelText="Workout #3"
              value={this.state.workout3}
              onChange={this.workout3Change}
              autoWidth={true}
            >
              <MenuItem value={'-'} primaryText="None" />
              <MenuItem value={'30'} primaryText="30 minutes" />
              <MenuItem value={'60'} primaryText="60 minutes" />
              <MenuItem value={'90'} primaryText="90 minutes" />
            </SelectField><br />
            <TextField
              floatingLabelText="Open Water Swims"
              defaultValue={this.state.ows === '-' ? '' : this.state.ows}
              onChange={this.owsChange}
            />
          </Dialog>
        </div>
      )
    } else {
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
}

const mapState = ({ weeks, goals }) => ({ weeks, goals })

export default connect(mapState, { setWeeks, setGoal, updateWeek, deleteWeek, addWeek })(Calendar)
