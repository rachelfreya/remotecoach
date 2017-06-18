import axios from 'axios'

const SET = 'SET_WEEK'

export const setWeek = id => ({ type: SET, id })

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET:
    return action.id
  }
  return state
}

export default reducer
