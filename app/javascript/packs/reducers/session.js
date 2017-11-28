import { SESSION_CHANGED } from '../actions'
import { updateObject } from '../util'
import {SESSION_VERIFIED} from '../actions/index'

const initialState = {
  active: false,
  wasVerified: false
}

function session(state=initialState, action) {
  switch(action.type) {
    case SESSION_CHANGED:
      return updateObject(state, { active: action.active })
    case SESSION_VERIFIED:
      return Object.assign({}, state, { wasVerified: true }, action.session)
  }

  return state
}

export default session
