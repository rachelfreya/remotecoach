import React, { Component } from 'react'
import { connect } from 'react-redux'

import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'

import { button } from '../utils'

const x = <NavigationClose />

const Messages = props => {
  const messages = props.messages,
    close = button(props.close, x)
  return (
  <Drawer width={500} openSecondary={true} open={props.drawer} >
    <AppBar title='Messages' iconElementLeft={close} />
    <List>
      {messages.map(message =>
      <div>
        <ListItem
          leftAvatar={<Avatar>{message.name[0]}</Avatar>}
          secondaryText={message.text}
          secondaryTextLines={2}
        />
        <Divider inset={true} />
      </div>
      )}
    </List>
    <TextField
      floatingLabelText='New Message'
      multiLine={true}
      rows={2}
      onChange={props.textChange}
      value={props.text}
    /><br />
    <RaisedButton label='Send' primary={true} onTouchTap={props.newMessage} />
  </Drawer>
  )
}

export default Messages
