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

import { editWorkout } from '../reducers/workout'
import { deleteWorkout } from '../reducers/workouts'

const coach = true

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
        type="submit"
        form="edit"
      />
    ]
    const workout = this.props.selectedWorkout
    return (
      <div>
        <Subheader>{workout.name}
          {coach ? <IconButton onTouchTap={this.open} ><Pencil /></IconButton> : null}
          {coach ? <IconButton onTouchTap={() => this.delete(workout.id)} ><Trash /></IconButton> : null}
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
        <Dialog
          title='Edit Workout'
          actions={actions}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <form id='edit' onSubmit={this.save}>
            <TextField
              floatingLabelText="Warm Up"
              defaultValue={workout.warmup === '-' ? '' : workout.warmup}
              name='warmup'
              rows={2}
            /><br />
            <TextField
              floatingLabelText="Set #1"
              defaultValue={workout.set1 === '-' ? '' : workout.set1}
              name='set1'
              rows={4}
            /><br />
            <TextField
              floatingLabelText="Set #2"
              defaultValue={workout.set2 === '-' ? '' : workout.set2}
              name='set2'
              rows={4}
            /><br />
            <TextField
              floatingLabelText="Set #3"
              defaultValue={workout.set3 === '-' ? '' : workout.set3}
              name='set3'
              rows={4}
            /><br />
            <TextField
              floatingLabelText="Cool Down"
              defaultValue={workout.cooldown === '-' ? '' : workout.cooldown}
              name='cooldown'
              rows={2}
            /><br />
            <TextField
              floatingLabelText="Total Yards"
              defaultValue={workout.total}
              name='total'
            />
          </form>
        </Dialog>
      </div>
    )
  }
}

const mapState = ({ selectedWorkout }) => ({ selectedWorkout })

export default connect(mapState, { editWorkout, deleteWorkout })(Workout)
