import React from 'react'
import { connect } from 'react-redux'

import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'

import { close } from '../reducers/drawer'

const messages = [{user: 'Abby', text: 'hello'}, {user: 'Barbara', text: 'hi'}]

const Messages = (props) => (
  <Drawer width={300} openSecondary={true} open={props.drawer} >
    <AppBar title="Messages" iconElementLeft={<IconButton onTouchTap={props.close} ><NavigationClose /></IconButton>} />
    <List>
      {messages.map(message =>
      <div>
        <ListItem
          leftAvatar={<Avatar>{message.user[0]}</Avatar>}
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
    />
  </Drawer>
)

const mapState = ({drawer}) => ({drawer})

export default connect(mapState, {close})(Messages)