import React, { Component } from 'react'
import { connect } from 'react-redux'

import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Pencil from 'material-ui/svg-icons/content/create'
import Trash from 'material-ui/svg-icons/action/delete'

import { editWorkout, deleteWorkout } from '../reducers/workout'

const coach = true

class Workout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      warmup: '',
      set1: '',
      set2: '',
      set3: '',
      cooldown: '',
      yards: null
    }
  }
  open = () => this.setState({open: true})
  close = () => this.setState({open: false})
  warmup = e => this.setState({ warmup: e.target.value })
  set1 = e => this.setState({ set1: e.target.value })
  set2 = e => this.setState({ set2: e.target.value })
  set3 = e => this.setState({ set3: e.target.value })
  cooldown = e => this.setState({ cooldown: e.target.value })
  total = e => this.setState({ yards: e.target.value })
  save = () => {
    this.close()
    this.props.editWorkout({ warmup: this.state.warmup, set1: this.state.set1, set2: this.state.set2, set3: this.state.set3, cooldown: this.state.cooldown, total: this.state.yards })
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
    const workout = this.props.selectedWorkout
    return (
      <div>
        <Subheader>All About That Kick
          {coach ? <IconButton onTouchTap={this.open} ><Pencil /></IconButton> : null}
          {coach ? <IconButton onTouchTap={() => this.props.deleteWorkout(workout.id)} ><Trash /></IconButton> : null}
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
          <TextField
            floatingLabelText="Warm Up"
            defaultValue={workout.warmup}
            onChange={this.warmup}
          /><br />
          <TextField
            floatingLabelText="Set #1"
            defaultValue={workout.set1}
            onChange={this.set1}
          /><br />
          <TextField
            floatingLabelText="Set #2"
            defaultValue={workout.set2}
            onChange={this.set2}
          /><br />
          <TextField
            floatingLabelText="Set #3"
            defaultValue={workout.set3}
            onChange={this.set3}
          /><br />
          <TextField
            floatingLabelText="Cool Down"
            defaultValue={workout.cooldown}
            onChange={this.cooldown}
          /><br />
          <TextField
            floatingLabelText="Total Yards"
            defaultValue={workout.total}
            onChange={this.total}
          />
        </Dialog>
      </div>
    )
  }
}

const mapState = ({ selectedWorkout }) => ({ selectedWorkout })

export default connect(mapState, { editWorkout, deleteWorkout })(Workout)

// else {
//       return (
//         <div>
//           <Subheader>All About That Kick</Subheader>
//           <List>
//             <ListItem primaryText='Warm Up' secondaryText='500 free' />
//             <ListItem primaryText='Set #1' secondaryText='500 free' />
//             <ListItem primaryText='Set #2' secondaryText='500 free' />
//             <ListItem primaryText='Set #3' secondaryText='500 free' />
//             <ListItem primaryText='Cool Down' secondaryText='500 free' />
//             <Divider />
//             <ListItem primaryText='Total Yards' secondaryText='500 free' />
//           </List>
//         </div>
//       )
//     }
