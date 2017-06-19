const OPEN = 'OPEN_DRAWER'
const CLOSE = 'CLOSE_DRAWER'

export const open = () => ({ type: OPEN })
export const close = () => ({ type: CLOSE })

const reducer = (state=false, action) => {
  switch (action.type) {
  case OPEN:
    return true
  case CLOSE:
    return false
  }
  return state
}

export default reducer
