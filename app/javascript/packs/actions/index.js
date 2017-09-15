import { TIMER_LENGTH_MS } from '../settings'
export const TIMER_START = 'TIMER_START'
export const TIMER_TICK = 'TIMER_TICK'
export const TIMER_STOP = 'TIMER_STOP'
export const TIMER_RESET = 'TIMER_RESET'

const TICK_INTERVAL_MS = 1000

let timer = null
let end_time = null

export const startTimer = () => (dispatch) => {
  clearInterval(timer)
  end_time = currentTimeInMs() + TIMER_LENGTH_MS
  timer = setInterval(() => dispatch(tickOrStopTimer()), TICK_INTERVAL_MS)
  dispatch({ type: TIMER_START })
}

const tickOrStopTimer = () => {
  return isTimerFinished() ? stopTimer() : tickTimer()
}

const isTimerFinished = () => {
  return currentTimeInMs() > end_time
}

const currentTimeInMs = () => {
  return new Date().getTime()
}

const tickTimer = () => {
  return {
    type: TIMER_TICK,
    time_remaining_ms: end_time - currentTimeInMs()
  }
}

const stopTimer = () => {
  clearInterval(timer)
  return { type: TIMER_STOP }
}

export const resetTimer = () => {
  clearInterval(timer)
  end_time = null;
  return { type: TIMER_RESET }
}
