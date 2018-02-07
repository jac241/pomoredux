import { SESSION_CHANGED } from '../actions'
import {RECEIVE_LOG_OUT, REQUEST_LOG_OUT, SESSION_VERIFIED} from '../actions/index'

const initialState = {
  active: false,
  wasVerified: false,
  isLoggingOut: false
}

function session(state=initialState, action) {
  switch(action.type) {
    case SESSION_CHANGED:
      return {
        ...state,
        active: action.active
      }
    case SESSION_VERIFIED:
      return {
        ...state,
        ...action.session,
        wasVerified: true,
      }
    case REQUEST_LOG_OUT:
      return {
        ...state,
        isLoggingOut: true
      }
    case RECEIVE_LOG_OUT:
      return {
        ...state,
        isLoggingOut: false
      }
  }

  return state
}

export default session
