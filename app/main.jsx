'use strict'
import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin()

import store from './store'
import Calendar from './components/Calendar'
import App from './components/App'
import Workouts from './components/Workouts'
import Workout from './components/Workout'
import Drills from './components/Drills'
import Resources from './components/Resources'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import { getWeeks } from './reducers/weeks'
import { getGoals } from './reducers/goals'
import { getDrills } from './reducers/drills'
import { getResources } from './reducers/resources'
import { getWorkouts } from './reducers/workouts'

const onAppEnter = () => {
  store.dispatch(getWeeks())
  store.dispatch(getGoals())
}

const onDrillsEnter = () => store.dispatch(getDrills())

const onWorkoutsEnter = () => store.dispatch(getWorkouts())

const onResourcesEnter = () => store.dispatch(getResources())

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Calendar} onEnter={onAppEnter} />
          <Route path='/workouts' component={Workouts} onEnter={onWorkoutsEnter} />
          <Route path='/workout' component={Workout} />
          <Route path='/drills' component={Drills} onEnter={onDrillsEnter} />
          <Route path='/resources' component={Resources} onEnter={onResourcesEnter} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('main')
)
