import axios from 'axios'

const GOALS_SET = 'GOALS_SET'

const goalsSet = goals => ({
  type: GOALS_SET, goals
})

const reducer = (state=[], action) => {
  switch (action.type) {
  case GOALS_SET:
    return action.goals
  }
  return state
}

export const setGoal = (goal) => dispatch => {
  axios.post('/api/goals', goal)
  .then(res => dispatch(goalsSet(res.data)))
  .catch(err => console.error(err))
}

export default reducer
