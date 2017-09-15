import { TIMER_LENGTH_MS, TIMER_LENGTHS_MS } from '../settings'
import plucks from '../assets/audio/plucks.mp3'

export const TIMER_START = 'TIMER_START'
export const TIMER_TICK = 'TIMER_TICK'
export const TIMER_STOP = 'TIMER_STOP'
export const TIMER_RESET = 'TIMER_RESET'
export const TIMER_MODE_CHANGE = 'TIMER_MODE_CHANGE'

const TICK_INTERVAL_MS = 1000

let timer = null
let end_time = null

export const startTimer = (mode) => (dispatch) => {
  clearInterval(timer)
  end_time = currentTimeInMs() + TIMER_LENGTHS_MS[mode]
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
  playFinishedAudio()
  return { type: TIMER_STOP }
}

const playFinishedAudio = () => {
  let audio = new Audio(plucks)
  audio.play()
}

export const resetTimer = () => {
  clearTimerFields()
  return { type: TIMER_RESET }
}

const clearTimerFields = () => {
  clearInterval(timer)
  end_time = null;
}

export const changeTimerMode = (newMode) => {
  clearTimerFields()
  return { type: TIMER_MODE_CHANGE, newMode: newMode }
}
