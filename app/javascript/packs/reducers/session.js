import { SESSION_CHANGED } from '../actions'
import { updateObject } from '../util'
import {RECEIVE_LOG_OUT, REQUEST_LOG_OUT, SESSION_VERIFIED} from '../actions/index'

const initialState = {
  active: false,
  wasVerified: false,
  isLoggingOut: false
}

function session(state=initialState, action) {
  switch(action.type) {
    case SESSION_CHANGED:
      return updateObject(state, { active: action.active })
    case SESSION_VERIFIED:
      return Object.assign({}, state, { wasVerified: true }, action.session)
    case REQUEST_LOG_OUT:
      return updateObject(state, { isLoggingOut: true })
    case RECEIVE_LOG_OUT:
      return updateObject(state, { isLoggingOut: false })
  }

  return state
}

export default session
