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

import { close } from '../reducers/drawer'
import { sendMessage } from '../reducers/messages'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  textChange = e => this.setState({ text: e.target.value })
  newMessage = () => {
    this.props.sendMessage(this.props.currentWeek, {name: 'Abby', text: this.state.text, weekId: this.props.currentWeek})
    this.setState({ text: '' })
    console.log(this.state.text)
  }
  render() {
    const messages = this.props.messages
    return (
    <Drawer width={300} openSecondary={true} open={this.props.drawer} >
      <AppBar title='Messages' iconElementLeft={<IconButton onTouchTap={this.props.close} ><NavigationClose /></IconButton>} />
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
        onChange={this.textChange}
        value={this.state.text}
      />
      <RaisedButton label='Send' primary={true} onTouchTap={this.newMessage} />
    </Drawer>
    )
  }
}

const mapState = ({drawer, messages, currentWeek}) => ({drawer, messages, currentWeek})

export default connect(mapState, {close, sendMessage})(Messages)
