const TOGGLE = 'TOGGLE_USER'

export const switchUser = () => ({ type: TOGGLE })

const reducer = (state=true, action) => {
  switch (action.type) {
  case TOGGLE:
    return !state
  }
  return state
}

export default reducer
