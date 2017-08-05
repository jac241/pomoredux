import { TIMER_LENGTH_MS } from '../settings'

const timerState = {
  time_remaining_ms: TIMER_LENGTH_MS
}

function timer(state=timerState, action) {
  switch(action.type) {
    case 'TIMER_TICK':
      return Object.assign({}, state, {
        time_remaining_ms: action.time_remaining_ms
      })
    case 'TIMER_START':
      return Object.assign({}, state, {
        time_remaining_ms: TIMER_LENGTH_MS
      })
    case 'TIMER_STOP':
      return state
  }
  return state
}

export default timer
