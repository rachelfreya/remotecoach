import axios from 'axios'

const GOT = 'GOT_MESSAGES'

const gotMessages = messages => ({
  type: GOT, messages
})

const reducer = (state=[], action) => {
  switch (action.type) {
  case GOT:
    return action.messages
  }
  return state
}

export const loadMessages = weekId => dispatch => {
  axios.get(`/api/weeks/${weekId}/messages`)
  .then(res => dispatch(gotMessages(res.data)))
  .catch(err => console.error(err))
}

export const sendMessage = (weekId, message) => dispatch => {
  axios.post(`/api/weeks/${weekId}/messages`, message)
  .then(res => dispatch(gotMessages(res.data)))
  .catch(err => console.error(err))
}

export const markAsRead = weekId => dispatch => {
  axios.put(`/api/weeks/${weekId}/messages`)
  .catch(err => console.error(err))
}

export default reducer
