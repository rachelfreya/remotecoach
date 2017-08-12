import React from 'react'

import { button } from '../utils'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'
import Badge from 'material-ui/Badge'
import Message from 'material-ui/svg-icons/communication/mail-outline'
import Pencil from 'material-ui/svg-icons/content/create'
import Add from 'material-ui/svg-icons/content/add'
import Trash from 'material-ui/svg-icons/action/delete'

const plus = <Add />,
  edit = <Pencil />,
  trash = <Trash />,
  message = <Message />

const Calendar = props => {
  const setWorkout = workout => isNaN(workout) ? workout : `${workout} minutes`

  const editGoal = month => button(props.openGoalEditor, edit, month)

  const editWeek = week => button(props.openWeekEditor, edit, week)

  const remove = weekId => button(props.deleteWeek, trash, weekId)

  const add = () => button(props.newWeek, plus)

  const messages = weekId => button(props.openMessages, message, weekId)

  const coach = props.coach
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
      {props.months.map(month =>
      <Table>
        <TableHeader displaySelectAll={false} >
          <TableRow >
            <TableHeaderColumn colSpan="3">
              {`${month} -- Goal: ${props.findGoal(month) ? props.findGoal(month).goal : ''}`}
              { coach && editGoal(month) }
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {props.weeks.filter(week => week.date.startsWith(month)).map(week =>
            <TableRow key={week.id} selectable={false} >
              <TableRowColumn>{week.date}</TableRowColumn>
              <TableRowColumn>{setWorkout(week.workout1)}</TableRowColumn>
              <TableRowColumn>{setWorkout(week.workout2)}</TableRowColumn>
              <TableRowColumn>{setWorkout(week.workout3)}</TableRowColumn>
              <TableRowColumn>{week.ows}</TableRowColumn>
              <TableRowColumn>
                <Badge
                  badgeContent={1}
                  secondary={true}
                  badgeStyle={{top: 12, right: 12}}
                >
                  {messages(week.id)}
                </Badge>
              </TableRowColumn>
              <TableRowColumn>
                { coach && editWeek(week) }
                { coach && remove(week.id) }
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
      )}
      { coach && add() }
    </div>
  )
}

export default Calendar
