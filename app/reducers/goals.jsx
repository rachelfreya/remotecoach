import axios from 'axios'

const GOALS_SET = 'GOALS_SET'
const GOT_GOALS = 'GOT_GOALS'

const goalsSet = goals => ({
  type: GOALS_SET, goals
})

const gotGoals = goals => ({
  type: GOT_GOALS, goals
})

const reducer = (state=[], action) => {
  switch (action.type) {
  case GOALS_SET:
    return action.goals
  case GOT_GOALS:
    return action.goals
  }
  return state
}

export const getGoals = () => dispatch => {
  axios.get('/api/goals')
  .then(res => dispatch(gotGoals(res.data)))
  .catch(err => console.error(err))
}

export const setGoal = goal => dispatch => {
  axios.post('/api/goals', goal)
  .then(res => dispatch(goalsSet(res.data)))
  .catch(err => console.error(err))
}

export default reducer
