import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import BottomNavBar from './BottomNavBar'

const user = 'Abby'

const App = ({children}) => (
  <div>
    <AppBar
      title={`Welcome, ${user}!`}
      iconElementRight={<FlatButton label='Switch User' />}
      />
    {children}
    <BottomNavBar />
  </div>
)

export default App
