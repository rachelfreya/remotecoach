import axios from 'axios'

const GOT = 'GOT_WORKOUT'

const gotWorkout = workout => ({
  type: GOT, workout
})

const reducer = (state={}, action) => {
  switch (action.type) {
  case GOT:
    return action.workout
  }
  return state
}

export const getWorkout = id => dispatch => {
  axios.get(`/api/workouts/${id}`)
  .then(res => dispatch(gotWorkout(res.data)))
  .catch(err => console.error(err))
}

export const editWorkout = (id, workout) => dispatch => {
  axios.put(`/api/workouts/${id}`, workout)
  .then(res => dispatch(gotWorkout(res.data)))
  .catch(err => console.error(err))
}

export default reducer
