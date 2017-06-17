import axios from 'axios'

const GOT_DRILLS = 'GOT_DRILLS'

const gotDrills = drills => ({
  type: GOT_DRILLS, drills
})

const reducer = (state=[], action) => {
  switch (action.type) {
  case GOT_DRILLS:
    return action.drills
  }
  return state
}

export const getDrills = () => dispatch => {
  axios.get('/api/drills')
  .then(res => dispatch(gotDrills(res.data)))
  .catch(err => console.error(err))
}

export const addDrill = drill => dispatch => {
  axios.post('/api/drills', drill)
  .then(res => dispatch(gotDrills(res.data)))
  .catch(err => console.error(err))
}

export const deleteDrill = id => dispatch => {
  axios.delete(`/api/drills/${id}`)
  .then(res => dispatch(gotDrills(res.data)))
  .catch(err => console.error(err))
}

export default reducer
