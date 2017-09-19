import { SESSION_CHANGED } from '../actions'
import { updateObject } from '../util'

const initialState = {
  active: false
}

function session(state=initialState, action) {
  switch(action.type) {
    case SESSION_CHANGED:
      return updateObject(state, { active: action.active })
  }

  return state
}

export default session
