import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  weeks: require('./weeks').default,
  goals: require('./goals').default,
  drills: require('./drills').default,
  resources: require('./resources').default,
  workouts: require('./workouts').default,
  selectedWorkout: require('./workout').default,
  messages: require('./messages').default,
  currentWeek: require('./week').default,
  coach: require('./user').default
})

export default rootReducer
