import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

export default class Workouts extends Component {
  render()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Warm Up</TableHeaderColumn>
          <TableHeaderColumn>Set #1</TableHeaderColumn>
          <TableHeaderColumn>Set #2</TableHeaderColumn>
          <TableHeaderColumn>Set #3</TableHeaderColumn>
          <TableHeaderColumn>Cool Down</TableHeaderColumn>
          <TableHeaderColumn>Total Yards</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
      {workouts.map((workout, i) => (
        <TableRow key={i}>
          <TableRowColumn>{workout.name}</TableRowColumn>
          <TableRowColumn>{workout.warmup}</TableRowColumn>
          <TableRowColumn>{workout.set1}</TableRowColumn>
          <TableRowColumn>{workout.set2}</TableRowColumn>
          <TableRowColumn>{workout.set3}</TableRowColumn>
          <TableRowColumn>{workout.cooldown}</TableRowColumn>
          <TableRowColumn>{workout.yardage}</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  )
}
