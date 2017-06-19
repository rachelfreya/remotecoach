import React from 'react'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import BottomNavBar from './BottomNavBar'
import { switchUser } from '../reducers/user'

const App = ({children, coach, switchUser}) => (
  <div>
    <AppBar
      showMenuIconButton={false}
      title={coach ? 'Welcome, Abby!' : 'Welcome, Barbara!'}
      iconElementRight={<FlatButton label='Switch User' onTouchTap={switchUser} />}
      />
    {children}
    <BottomNavBar />
  </div>
)

const mapState = ({coach}) => ({coach})

export default connect(mapState, {switchUser})(App)
