import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'

export default class Workout extends Component {
  render() {
    return (
      <List>
        <ListItem primaryText='Warm Up' secondaryText='500 free' />
        <ListItem primaryText='Set #1' secondaryText='500 free' />
        <ListItem primaryText='Set #2' secondaryText='500 free' />
        <ListItem primaryText='Set #3' secondaryText='500 free' />
        <ListItem primaryText='Cool Down' secondaryText='500 free' />
        <ListItem primaryText='Total Yards' secondaryText='500 free' />
      </List>
    )
  }
}
