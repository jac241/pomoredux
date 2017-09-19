import { TIMER_LENGTH_MS, TIMER_LENGTHS_MS } from '../settings'
import plucks from '../assets/audio/plucks.mp3'

export const TIMER_START = 'TIMER_START'
export const TIMER_TICK = 'TIMER_TICK'
export const TIMER_STOP = 'TIMER_STOP'
export const TIMER_RESET = 'TIMER_RESET'
export const TIMER_MODE_CHANGE = 'TIMER_MODE_CHANGE'
export const SESSION_CHANGED = 'SESSION_CHANGED'

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

const csrfToken = () => {
  const meta_tag = document.querySelector('meta[name="csrf-token"]')
  return meta_tag ? meta_tag.content : ''
}

export const createUser = (user_attributes) => {
  return dispatch => {
    return fetchWithCSRF('/api/users', 'post', user_attributes)
      .then(handleResponse)
  }
}

const fetchWithCSRF = (endpoint, method, data) => {
  let options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken(),
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'same-origin'
  }

  if (data) {
    options['body'] = JSON.stringify(data)
  }

  return fetch(endpoint, options)
}

const handleResponse = (response) => {
  if (response.ok) {
    if (!(response.status === 204)) { // has content
      return response.json()
    }
    else {
      return
    }
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const createUserSession = (user_attributes) => {
  return dispatch => {
    return fetchWithCSRF('/api/users/sign_in', 'post', user_attributes)
      .then(handleResponse)
      .then(dispatch(sessionChanged({ active: true })))
  }
}

export const destroyUserSession = () => {
  return dispatch => {
    return fetchWithCSRF('/api/users/sign_out', 'delete')
      .then(handleResponse)
      .then(embedNewCSRFTokenIfPresent)
      .then(dispatch(sessionChanged({ active: false })))
  }
}

const embedNewCSRFTokenIfPresent = (data) => {
  const csrf_tag = document.querySelector('meta[name="csrf-token"]')
  if (data && csrf_tag) {
    csrf_tag.content = data['csrf_token']
  }
}

export const sessionChanged = ({ active }) => {
  return {
    type: SESSION_CHANGED,
    active: active
  }
}
