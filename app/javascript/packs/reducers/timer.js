import { TIMER_LENGTH_MS, TIMER_LENGTHS_MS } from '../settings'
import {
  TIMER_TICK,
  TIMER_START,
  TIMER_STOP,
  TIMER_RESET,
  TIMER_MODE_CHANGE
} from '../actions/index'
import { updateObject } from '../util'

const initialState = {
  time_remaining_ms: TIMER_LENGTHS_MS['pomodoro'],
  mode: 'pomodoro',
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
        time_remaining_ms: TIMER_LENGTHS_MS[state.mode]
      })
    case TIMER_STOP:
      return updateObject(state, {
        active: false
      })
    case TIMER_RESET:
      return updateObject(state, {
        active: false,
        time_remaining_ms: TIMER_LENGTHS_MS[state.mode]
      })
    case TIMER_MODE_CHANGE:
      return updateObject(state, {
        mode: action.newMode,
        active: false,
        time_remaining_ms: TIMER_LENGTHS_MS[action.newMode]
      })
  }
  return state
}

export default timer
