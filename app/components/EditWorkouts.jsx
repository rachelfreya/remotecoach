import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import { Link } from 'react-router'

const workouts = [
  {name: 'Sprint', yardage: 2000},
  {name: 'Distance', yardage: 3000}
]

export default class Workouts extends Component {
  render() {
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
