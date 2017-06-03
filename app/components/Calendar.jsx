import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

export default class Calendar extends Component {
  render()
  return (
    <div>
      <Table>
        {plan.map((month, monthidx) => (
        <TableHeader>
          <TableRow key={monthidx}>
            <TableHeaderColumn colSpan="3">
              {`${month.name} Goal: ${month.goal}`}
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Week</TableHeaderColumn>
            <TableHeaderColumn>Workout #1</TableHeaderColumn>
            <TableHeaderColumn>Workout #2</TableHeaderColumn>
            <TableHeaderColumn>Workout #3</TableHeaderColumn>
            <TableHeaderColumn>Open Water Swims</TableHeaderColumn>
            <TableHeaderColumn>Notes</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {month.weeks.map((week, weekidx) => (
            <TableRow key={weekidx}>
              <TableRowColumn>{week.date}</TableRowColumn>
              <TableRowColumn>{week.workout1}</TableRowColumn>
              <TableRowColumn>{week.workout2}</TableRowColumn>
              <TableRowColumn>{week.workout3}</TableRowColumn>
              <TableRowColumn>{week.ows}</TableRowColumn>
              <TableRowColumn>{icon}</TableRowColumn>
            </TableRow>
            ))}
        </TableBody>
        ))}
      </Table>
    </div>
  )
}
