import axios from 'axios'

const WEEKS_SET = 'WEEKS_SET'

const weeksSet = weeks => ({
  type: WEEKS_SET, weeks
})

const reducer = (state=[], action) => {
  switch (action.type) {
  case WEEKS_SET:
    return action.weeks
  }
  return state
}

export const setWeeks = weeks => dispatch => {
  axios.post('/api/weeks', weeks)
  .then(res => dispatch(weeksSet(res.data)))
  .catch(err => console.error(err))
}

export default reducer
