import axios from 'axios'

const GOT = 'GOT_RESOURCES'

const gotResources = resources => ({
  type: GOT, resources
})

const reducer = (state=[], action) => {
  switch (action.type) {
  case GOT:
    return action.resources
  }
  return state
}

export const getResources = () => dispatch => {
  axios.get('/api/resources')
  .then(res => dispatch(gotResources(res.data)))
  .catch(err => console.error(err))
}

export const addResource = resource => dispatch => {
  axios.post('/api/resources', resource)
  .then(res => dispatch(gotResources(res.data)))
  .catch(err => console.error(err))
}

export const deleteResource = id => dispatch => {
  axios.delete(`/api/resources/${id}`)
  .then(res => dispatch(gotResources(res.data)))
  .catch(err => console.error(err))
}

export default reducer
