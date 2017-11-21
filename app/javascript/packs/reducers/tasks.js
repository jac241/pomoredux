import {RECEIVE_TASK} from '../actions/index'
import {updateObject} from '../util'

const initialState = []

function session(state=initialState, action) {
  switch(action.type) {
    case RECEIVE_TASK:
      return state.concat(action.task)
  }
  return state
}

export default session