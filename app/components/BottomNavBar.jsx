import React, {Component} from 'react'
import { Link } from 'react-router'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import Plan from 'material-ui/svg-icons/action/assignment'
import Workouts from 'material-ui/svg-icons/places/pool'
import Drills from 'material-ui/svg-icons/action/accessibility'
import Resources from 'material-ui/svg-icons/av/video-library'

const plan = <Plan />
const workouts = <Workouts />
const drills = <Drills />
const resources = <Resources />

class BottomNavBar extends Component {
  state = {
    selectedIndex: 0,
  }

  select = (index) => this.setState({selectedIndex: index})

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <Link to='/' >
            <BottomNavigationItem
              label="Plan"
              icon={plan}
              onTouchTap={() => this.select(0)}
            />
          </Link>
          <Link to='/workouts' >
            <BottomNavigationItem
              label="Sample Workouts"
              icon={workouts}
              onTouchTap={() => this.select(1)}
            />
          </Link>
          <Link to='/drills' >
            <BottomNavigationItem
              label="Drills"
              icon={drills}
              onTouchTap={() => this.select(2)}
            />
          </Link>
          <Link to='/resources' >
            <BottomNavigationItem
              label="Resources"
              icon={resources}
              onTouchTap={() => this.select(2)}
            />
          </Link>
        </BottomNavigation>
      </Paper>
    )
  }
}

export default BottomNavBar
