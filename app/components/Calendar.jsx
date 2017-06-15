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
import { setWeeks } from '../reducers/weeks'
import { setGoal } from '../reducers/goals'

const coach = true

// const goals = [{month: 'June', goal: 'Get faster'}, {month: 'July', goal: 'Get stronger'}]

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      week: false,
      goalDialog: false,
      month: '',
      goal: '',
      workout1: null,
      workout2: null,
      workout3: null,
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
    const weeks = []
    for (let week = startDate; week <= endDate; week.setDate(week.getDate() + 7)) {
      weeks.push({'date': `${convertMonth(week.getMonth())} ${week.getDate()}`})
    }
    this.props.setWeeks(weeks)
  }
  openWeekEditor = (weekidx) => {
    weekidx >= 0 ? this.setState({dialog: true, workout1: weeks[weekidx].workout1, workout2: weeks[weekidx].workout2, workout3: weeks[weekidx].workout3}) : this.setState({dialog: true, workout1: 60, workout2: 60, workout3: 60})
  }

  closeWeekEditor = () => this.setState({ weeks: false })

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
    return this.props.goals.find(goal => goal.month === month)
  }

  workout1Change = (event, index, value) => this.setState({workout1: value})

  workout2Change = (event, index, value) => this.setState({workout2: value})

  workout3Change = (event, index, value) => this.setState({workout3: value})

  render() {
    const weeks = this.props.weeks
    const uniqueMonths = new Set(weeks.map(week => week.date.split(' ')[0]))
    const months = Array.from(uniqueMonths)
    const weekActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeWeekEditor}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.closeWeekEditor}
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
    if (coach) {
      if (weeks.length) {
        return (
          <div>
            <Table>
              <TableHeader displaySelectAll={false} >
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
                <TableRow>
                  <TableHeaderColumn colSpan="3">
                    {`${month} -- Goal: ${this.findGoal(month) ? this.findGoal(month).goal : ''}`}
                    <IconButton onTouchTap={() => this.openGoalEditor(month)} ><Pencil /></IconButton>
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weeks.filter(week => week.date.startsWith(month)).map((week, weekidx) =>
                  <TableRow>
                    <TableRowColumn>{week.date}</TableRowColumn>
                    <TableRowColumn>{isNaN(week.workout1) ? week.workout1 : `${week.workout1} minutes`}</TableRowColumn>
                    <TableRowColumn>{isNaN(week.workout2) ? week.workout2 : `${week.workout2} minutes`}</TableRowColumn>
                    <TableRowColumn>{isNaN(week.workout3) ? week.workout3 : `${week.workout3} minutes`}</TableRowColumn>
                    <TableRowColumn>{week.ows}</TableRowColumn>
                    <TableRowColumn><IconButton onTouchTap={this.openMessages} ><Message /></IconButton></TableRowColumn>
                    <TableRowColumn>
                      <IconButton onTouchTap={() => this.openWeekEditor(weekidx)} ><Pencil /></IconButton>
                      <IconButton><Trash /></IconButton>
                    </TableRowColumn>
                  </TableRow>
                )}
              </TableBody>
                <IconButton>
                  <Add />
                </IconButton>
            </Table>
            )}
            <IconButton onTouchTap={() => this.openWeekEditor(-1)} >
              <Add />
            </IconButton>
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
              title='Week of March 1'
              actions={weekActions}
              modal={true}
              open={this.state.week}
            >
              <SelectField
                floatingLabelText="Workout #1"
                value={this.state.workout1}
                onChange={this.workout1Change}
                autoWidth={true}
              >
                <MenuItem value={0} primaryText="None" />
                <MenuItem value={30} primaryText="30 minutes" />
                <MenuItem value={60} primaryText="60 minutes" />
                <MenuItem value={90} primaryText="90 minutes" />
              </SelectField><br />
              <SelectField
                floatingLabelText="Workout #2"
                value={this.state.workout2}
                onChange={this.workout2Change}
                autoWidth={true}
              >
                <MenuItem value={0} primaryText="None" />
                <MenuItem value={30} primaryText="30 minutes" />
                <MenuItem value={60} primaryText="60 minutes" />
                <MenuItem value={90} primaryText="90 minutes" />
              </SelectField><br />
              <SelectField
                floatingLabelText="Workout #3"
                value={this.state.workout3}
                onChange={this.workout3Change}
                autoWidth={true}
              >
                <MenuItem value={0} primaryText="None" />
                <MenuItem value={30} primaryText="30 minutes" />
                <MenuItem value={60} primaryText="60 minutes" />
                <MenuItem value={90} primaryText="90 minutes" />
              </SelectField><br />
              <TextField
                floatingLabelText="Open Water Swims"
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
    } else {
      return (
        <div>
          <Table>
            <TableHeader displaySelectAll={false} >
              <TableRow>
                <TableHeaderColumn>Week</TableHeaderColumn>
                <TableHeaderColumn>Workout #1</TableHeaderColumn>
                <TableHeaderColumn>Workout #2</TableHeaderColumn>
                <TableHeaderColumn>Workout #3</TableHeaderColumn>
                <TableHeaderColumn>Open Water Swims</TableHeaderColumn>
                <TableHeaderColumn>Notes</TableHeaderColumn>
              </TableRow>
            </TableHeader>
          </Table>
          {goals.map((month, monthidx) =>
          <Table>
            <TableHeader displaySelectAll={false} >
              <TableRow>
                <TableHeaderColumn colSpan="3">
                  {`${month.name} -- Goal: ${month.goal} `}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeks.filter(week => week.date.startsWith(month.name)).map((week, weekidx) =>
                <TableRow>
                  <TableRowColumn>{week.date}</TableRowColumn>
                  <TableRowColumn>{isNaN(week.workout1) ? week.workout1 : `${week.workout1} minutes`}</TableRowColumn>
                  <TableRowColumn>{isNaN(week.workout2) ? week.workout2 : `${week.workout2} minutes`}</TableRowColumn>
                  <TableRowColumn>{isNaN(week.workout3) ? week.workout3 : `${week.workout3} minutes`}</TableRowColumn>
                  <TableRowColumn>{week.ows}</TableRowColumn>
                  <TableRowColumn><IconButton onTouchTap={this.openMessages} ><Message /></IconButton></TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
          )}
          <Messages />
        </div>
      )
    }
  }
}

const mapState = ({ weeks, goals }) => ({ weeks, goals })

export default connect(mapState, { setWeeks, setGoal })(Calendar)
