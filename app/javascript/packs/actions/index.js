import { TIMER_LENGTH_MS } from '../settings'
export const TIMER_START = 'TIMER_START'
export const TIMER_TICK = 'TIMER_TICK'
export const TIMER_STOP = 'TIMER_STOP'
export const TIMER_RESET = 'TIMER_RESET'

const TICK_INTERVAL_MS = 1000;

let timer = null;
let time_remaining_ms = TIMER_LENGTH_MS

export const startTimer = () => (dispatch) => {
  clearInterval(timer)
  time_remaining_ms = TIMER_LENGTH_MS
  timer = setInterval(() => dispatch(tickOrStopTimer()), TICK_INTERVAL_MS)
  dispatch({ type: TIMER_START })
}

const tickOrStopTimer = () => {
  return time_remaining_ms > 0 ? tickTimer() : stopTimer()
}

const tickTimer = () => {
  time_remaining_ms -= TICK_INTERVAL_MS
  return {
    type: TIMER_TICK,
    time_remaining_ms: time_remaining_ms
  }
}

const stopTimer = () => {
  clearInterval(timer)
  return { type: TIMER_STOP }
}

export const resetTimer = () => {
  clearInterval(timer)
  time_remaining_ms = TIMER_LENGTH_MS
  return { type: TIMER_RESET }
}
