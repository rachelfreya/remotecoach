import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

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

import AddWorkout from './AddWorkout'

import { addWorkout, deleteWorkout } from '../reducers/workouts'

class Workouts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      name: '',
      yards: null
    }
  }

  open = () => this.setState({open: true})

  close = () => this.setState({open: false})

  nameChange = e => this.setState({ name: e.target.value })

  yardChange = e => this.setState({ yards: e.target.value })

  save = () => {
    this.close()
    this.props.addWorkout({ name: this.state.name, total: this.state.yards })
  }

  render() {
    const workouts = this.props.workouts, coach = this.props.coach
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
          {workouts.map(workout =>
            <TableRow>
              <TableRowColumn>
                <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
              </TableRowColumn>
              <TableRowColumn>{workout.total}</TableRowColumn>
              <TableRowColumn>
                {coach && <IconButton onTouchTap={() => this.props.deleteWorkout(workout.id)} >
                  <Trash />
                </IconButton>}
              </TableRowColumn>
            </TableRow>
            )}
          </TableBody>
        </Table>
        {coach && <IconButton onTouchTap={this.open} >
          <Add />
        </IconButton>}
        <AddWorkout save={this.save} close={this.close} nameChange={this.nameChange} yardChange={this.yardChange} open={this.state.open} />
      </div>
    )
  }
}

const mapState = ({ workouts, coach }) => ({ workouts, coach })

export default connect(mapState, { addWorkout, deleteWorkout })(Workouts)
