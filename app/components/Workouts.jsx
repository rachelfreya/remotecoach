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

import { addWorkout, deleteWorkout } from '../reducers/workouts'

const coach = true

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
    this.props.addWorkout({ name: this.state.name, yardage: this.state.yards })
  }
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
        onTouchTap={this.save}
      />
    ]
    const workouts = this.props.workouts
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
              <TableRowColumn>{workout.yardage}</TableRowColumn>
              <TableRowColumn>
                {coach ? <IconButton onTouchTap={() => this.props.deleteWorkout(workout.id)} ><Trash /></IconButton> : null}
              </TableRowColumn>
            </TableRow>
            )}
          </TableBody>
        </Table>
        {coach ? <IconButton onTouchTap={this.open} >
                  <Add />
                </IconButton> : null}
        <Dialog
          title='Add Workout'
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <TextField
            floatingLabelText="Workout Name"
            onChange={this.nameChange}
          /><br />
          <TextField
            floatingLabelText="Total Yards"
            onChange={this.yardChange}
          />
        </Dialog>
      </div>
    )
  }
}

const mapState = ({ workouts }) => ({ workouts })

export default connect(mapState, { addWorkout, deleteWorkout })(Workouts)
