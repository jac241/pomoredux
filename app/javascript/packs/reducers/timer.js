import { TIMER_LENGTH_MS } from '../settings'
import {
  TIMER_TICK,
  TIMER_START,
  TIMER_STOP,
  TIMER_RESET
} from '../actions/index'

const updateObject = (oldObject, newValues) => {
    return Object.assign({}, oldObject, newValues)
}

const initialState = {
  time_remaining_ms: TIMER_LENGTH_MS,
  active: false
}

function timer(state=initialState, action) {
  switch(action.type) {
    case TIMER_TICK:
      return updateObject(state, {
        time_remaining_ms: action.time_remaining_ms
      })
    case TIMER_START:
      return updateObject(state, {
        active: true,
        time_remaining_ms: TIMER_LENGTH_MS
      })
    case TIMER_STOP:
      return updateObject(state, {
        active: false
      })
    case TIMER_RESET:
      return updateObject(state, {
        active:false,
        time_remaining_ms: TIMER_LENGTH_MS
      })
  }
  return state
}

export default timer
