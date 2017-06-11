import React, { Component } from 'react'
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
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'

const plan = [
  {name: 'January',
    goal: 'Get faster',
    weeks: [
    {date: 'Jan. 1', workout1: 'Kick', workout2: 'Pull', workout3: 'Swim', ows: 'none'},
    {date: 'Jan. 8', workout1: 'Pull', workout2: 'Swim', workout3: 'Kick', ows: 'SCAR'}
    ]
  },
  {name: 'February',
    goal: 'Get stronger',
    weeks: [
    {date: 'Feb. 1', workout1: 'None', workout2: 'None', workout3: 'None', ows: 'None'}
    ]
  }
]

const message = <Message />
const edit = <Pencil />
//const add = <Add />

export default class EditCalendar extends Component {
  render() {
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
        {plan.map((month, monthidx) =>
        <Table>
          <TableHeader displaySelectAll={false} >
            <TableRow>
              <TableHeaderColumn colSpan="3">
                {`${month.name} -- Goal: ${month.goal} `}
                {edit}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {month.weeks.map((week, weekidx) =>
              <TableRow>
                <TableRowColumn>{week.date}</TableRowColumn>
                <TableRowColumn>{week.workout1}</TableRowColumn>
                <TableRowColumn>{week.workout2}</TableRowColumn>
                <TableRowColumn>{week.workout3}</TableRowColumn>
                <TableRowColumn>{week.ows}</TableRowColumn>
                <TableRowColumn>{message}</TableRowColumn>
                <TableRowColumn>{edit}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
            <IconButton>
              <Add />
            </IconButton>
        </Table>
        )}
        <IconButton>
          <Add />
        </IconButton>
        <Drawer width={300} openSecondary={true} open={false} >
          <AppBar title="Messages" showMenuIconButton={false} />
          <List>
            <ListItem
              leftAvatar={<Avatar>A</Avatar>}
              secondaryText={'This is a test'}
              secondaryTextLines={2}
            />
            <Divider inset={true} />
          </List>
        </Drawer>
      </div>
    )
  }
}
