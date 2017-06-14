import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Pencil from 'material-ui/svg-icons/content/create'

const workout = {warmup: '500 free', set1: '4 x 100', set2: '5 x 50', set3: '-', cooldown: '200 free', total: '1000 yards'}

export default class Workout extends Component {
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
    return (
      <div>
        <Subheader>All About That Kick<IconButton onTouchTap={this.open} ><Pencil /></IconButton></Subheader>
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
          /><br />
          <TextField
            floatingLabelText="Set #1"
            defaultValue={workout.set1}
          /><br />
          <TextField
            floatingLabelText="Set #2"
            defaultValue={workout.set2}
          /><br />
          <TextField
            floatingLabelText="Set #3"
            defaultValue={workout.set3}
          /><br />
          <TextField
            floatingLabelText="Cool Down"
            defaultValue={workout.cooldown}
          /><br />
          <TextField
            floatingLabelText="Total Yards"
            defaultValue={workout.total}
          />
        </Dialog>
      </div>
    )
  }
}
