import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  weeks: require('./weeks').default,
  goals: require('./goals').default,
  drawer: require('./drawer').default,
  drills: require('./drills').default,
  resources: require('./resources').default,
  workouts: require('./workouts').default,
  selectedWorkout: require('./workout').default
})

export default rootReducer
