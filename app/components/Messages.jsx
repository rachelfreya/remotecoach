import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'

export default class Messages extends Component {
  render()
  return (
    <List>
      {messages.map((message, i) => (
      <ListItem
        key={i}
        leftAvatar={<Avatar>{message.initial}</Avatar>}
        secondaryText={
          <p>
            {message.text}
          </p>
        }
        secondaryTextLines={2}
      />
      <Divider inset={true} />
      ))}
    </List>
  )
}
