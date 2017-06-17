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

export const getWorkout = id => dispatch => {
  axios.get(`/api/workout/${id}`)
  .then(res => dispatch(gotWorkout(res.data)))
  .catch(err => console.error(err))
}

export const deleteWorkout = id => dispatch => {
  axios.delete(`/api/workouts/${id}`)
  .then(res => dispatch(gotWorkouts(res.data)))
  .catch(err => console.error(err))
}

export const editWorkout = id => dispatch => {
  axios.put(`/api/workouts/${id}`)
  .then(res => dispatch)
}

export default reducer
