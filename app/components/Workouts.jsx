import React, { Component } from 'react'
import { Link } from 'react-router'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import Add from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Trash from 'material-ui/svg-icons/action/delete'

const coach = true

const workouts = [
  {name: 'Sprint', yardage: 2000},
  {name: 'Distance', yardage: 3000}
]

export default class Workouts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  open = () => this.setState({open: true})
  close = () => this.setState({open: false})
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.close}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.close}
      />
    ]
    if (coach) {
      return (
        <div>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Total Yards</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} >
            {workouts.map((workout, i) =>
              <TableRow key={i}>
                <TableRowColumn>
                  <Link to={`/workouts/${i}`}>{workout.name}</Link>
                </TableRowColumn>
                <TableRowColumn>{workout.yardage}</TableRowColumn>
                <TableRowColumn>
                  <IconButton><Trash /></IconButton>
                </TableRowColumn>
              </TableRow>
              )}
            </TableBody>
          </Table>
          <IconButton onTouchTap={this.open} >
            <Add />
          </IconButton>
          <Dialog
            title='Add Workout'
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <TextField
              floatingLabelText="Workout Name"
            /><br />
            <TextField
              floatingLabelText="Total Yards"
            />
          </Dialog>
        </div>
      )
    } else {
      return (
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Total Yards</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
          {workouts.map((workout, i) =>
            <TableRow key={i}>
              <TableRowColumn>
                <Link to={`/workouts/${i}`}>{workout.name}</Link>
              </TableRowColumn>
              <TableRowColumn>{workout.yardage}</TableRowColumn>
            </TableRow>
            )}
          </TableBody>
        </Table>
      )
    }
  }
}
