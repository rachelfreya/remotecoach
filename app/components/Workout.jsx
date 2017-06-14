import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

export default class Workout extends Component {
  render() {
    return (
      <div>
        <Subheader>All About That Kick</Subheader>
        <List>
          <ListItem primaryText='Warm Up' secondaryText='500 free' />
          <ListItem primaryText='Set #1' secondaryText='500 free' />
          <ListItem primaryText='Set #2' secondaryText='500 free' />
          <ListItem primaryText='Set #3' secondaryText='500 free' />
          <ListItem primaryText='Cool Down' secondaryText='500 free' />
          <Divider />
          <ListItem primaryText='Total Yards' secondaryText='500 free' />
        </List>
      </div>
    )
  }
}
