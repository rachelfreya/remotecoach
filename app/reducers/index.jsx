import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  weeks: require('./weeks').default,
  goals: require('./goals').default,
  drawer: require('./drawer').default
})

export default rootReducer
