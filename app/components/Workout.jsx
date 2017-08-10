import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Pencil from 'material-ui/svg-icons/content/create'
import Trash from 'material-ui/svg-icons/action/delete'

import EditWorkout from './EditWorkout'

import { editWorkout } from '../reducers/workout'
import { deleteWorkout } from '../reducers/workouts'
import { button } from '../utils'

const pencil = <Pencil />,
  trash = <Trash />

class Workout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  open = () => this.setState({open: true})

  close = () => this.setState({open: false})

  save = e => {
    e.preventDefault()
    this.props.editWorkout(this.props.selectedWorkout.id, { warmup: e.target.warmup.value, set1: e.target.set1.value, set2: e.target.set2.value, set3: e.target.set3.value, cooldown: e.target.cooldown.value, total: e.target.total.value })
    this.close()
  }

  delete = id => {
    this.props.deleteWorkout(id)
    browserHistory.replace('/workouts')
  }

  edit = () => button(this.open, pencil)

  remove = id => button(this.delete, trash, id)

  render() {
    const workout = this.props.selectedWorkout, coach = this.props.coach
    return (
      <div>
        <Subheader>{workout.name}
          {coach && this.edit()}
          {coach && this.remove(workout.id)}
        </Subheader>
        <List>
          <ListItem primaryText='Warm Up' secondaryText={workout.warmup} />
          <ListItem primaryText='Set #1' secondaryText={workout.set1} />
          <ListItem primaryText='Set #2' secondaryText={workout.set2} />
          <ListItem primaryText='Set #3' secondaryText={workout.set3} />
          <ListItem primaryText='Cool Down' secondaryText={workout.cooldown} />
          <Divider />
          <ListItem primaryText='Total Yards' secondaryText={workout.total} />
        </List>
        <EditWorkout close={this.close} workout={workout} open={this.state.open} save={this.save} />
      </div>
    )
  }
}

const mapState = ({ selectedWorkout, coach }) => ({ selectedWorkout, coach })

export default connect(mapState, { editWorkout, deleteWorkout })(Workout)
