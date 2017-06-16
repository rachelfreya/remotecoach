import axios from 'axios'

const WEEKS_SET = 'WEEKS_SET'
const GOT_WEEKS = 'GOT_WEEKS'
const UPDATED_WEEK = 'UPDATED_WEEK'
const DELETED_WEEK = 'DELETED_WEEK'
const ADDED_WEEK = 'ADDED_WEEK'

const weeksSet = weeks => ({
  type: WEEKS_SET, weeks
})

const gotWeeks = weeks => ({
  type: GOT_WEEKS, weeks
})

const updatedWeek = weeks => ({
  type: UPDATED_WEEK, weeks
})

const deletedWeek = weeks => ({
  type: DELETED_WEEK, weeks
})

const addedWeek = week => ({
  type: ADDED_WEEK, week
})

const reducer = (state=[], action) => {
  switch (action.type) {
  case WEEKS_SET:
    return action.weeks
  case GOT_WEEKS:
    return action.weeks
  case UPDATED_WEEK:
    return action.weeks
  case DELETED_WEEK:
    return action.weeks
  case ADDED_WEEK:
    return [...state, action.week]
  }
  return state
}

export const setWeeks = weeks => dispatch => {
  axios.post('/api/weeks', weeks)
  .then(res => dispatch(weeksSet(res.data)))
  .catch(err => console.error(err))
}

export const getWeeks = () => dispatch => {
  axios.get('/api/weeks')
  .then(res => dispatch(gotWeeks(res.data)))
  .catch(err => console.error(err))
}

export const updateWeek = (id, week) => dispatch => {
  axios.put(`/api/weeks/${id}`, week)
  .then(res => dispatch(updatedWeek(res.data)))
  .catch(err => console.error(err))
}

export const deleteWeek = id => dispatch => {
  axios.delete(`/api/weeks/${id}`)
  .then(res => dispatch(deletedWeek(res.data)))
  .catch(err => console.error(err))
}

export const addWeek = week => dispatch => {
  axios.post('/api/weeks/add', week)
  .then(res => dispatch(addedWeek(res.data)))
  .catch(err => console.error(err))
}

export default reducer
