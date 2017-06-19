import axios from 'axios'

const GOT = 'GOT_WORKOUTS'

const gotWorkouts = workouts => ({
  type: GOT, workouts
})

const reducer = (state=[], action) => {
  switch (action.type) {
  case GOT:
    return action.workouts
  }
  return state
}

export const getWorkouts = () => dispatch => {
  axios.get('/api/workouts')
  .then(res => dispatch(gotWorkouts(res.data)))
  .catch(err => console.error(err))
}

export const addWorkout = workout => dispatch => {
  axios.post('/api/workouts', workout)
  .then(res => dispatch(gotWorkouts(res.data)))
  .catch(err => console.error(err))
}

export const deleteWorkout = id => dispatch => {
  axios.delete(`/api/workouts/${id}`)
  .then(res => dispatch(gotWorkouts(res.data)))
  .catch(err => console.error(err))
}

export default reducer
