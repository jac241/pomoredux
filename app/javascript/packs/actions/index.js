import { BUFFER_SO_THAT_59_ALWAYS_SHOWN } from '../settings'
import plucksMp3 from '../assets/audio/plucks.mp3'
import plucksOgg from '../assets/audio/plucks.ogg'

import { Howl } from 'howler'
import {SubmissionError} from 'redux-form'

export const TIMER_START = 'TIMER_START'
export const TIMER_TICK = 'TIMER_TICK'
export const TIMER_STOP = 'TIMER_STOP'
export const TIMER_RESET = 'TIMER_RESET'
export const TIMER_MODE_CHANGE = 'TIMER_MODE_CHANGE'
export const SESSION_CHANGED = 'SESSION_CHANGED'
export const REQUEST_TIMER_SETTINGS = 'REQUEST_TIMER_SETTINGS'
export const RECEIVE_TIMER_SETTINGS = 'RECEIVE_TIMER_SETTINGS'
export const RESET_TIMER_SETTINGS = 'RESET_TIMER_SETTINGS'
export const OPEN_NEW_TASK_MODAL = 'OPEN_NEW_TASK_MODAL'
export const CLOSE_NEW_TASK_MODAL = 'CLOSE_NEW_TASK_MODAL'
export const RECEIVE_TASK = 'RECEIVE_TASK'
export const REQUEST_TASKS = 'REQUEST_TASKS'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'


const TICK_INTERVAL_MS = 1000

let timer = null
let end_time = null

export const startTimer = (mode) => (dispatch, getState) => {
  clearInterval(timer)
  end_time = currentTimeInMs() + getTimerLengthFromState(getState(), mode)
  timer = setInterval(() => dispatch(tickOrStopTimer()), TICK_INTERVAL_MS)
  dispatch({ type: TIMER_START })
}

const getTimerLengthFromState = (state, mode) => {
  return state.timer.settings.lengths_by_mode_ms[mode]
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
  let audio = new Howl({ src: [plucksMp3, plucksOgg] })
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
      .then(() => {
        dispatch(sessionChanged({ active: true }))
      })
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

  return fetch(endpoint, options).then(handleResponse).catch(parseErrorBody).catch(refreshIfInvalidAuthenticityToken)
}

const handleResponse = (response) => {
  if (response.ok) {
    if (response.status === 204) { // no content
      return
    }
    return response.json()
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseErrorBody = (err) => {
  return err.response.text()
    .then((text) => {
      if (text.length > 0) {
        try {
          err.body = JSON.parse(text)
        } catch(parse_err) {
          console.error(text)
          console.error(parse_err, parse_err.stack)
        }
      }
      throw err
    })
}

const reformatForApi = (userParams) => (
  { api_user: userParams }
)

export const createUserSession = (userAttributes) => {
  return dispatch => {
    return fetchWithCSRF('/api/users/sign_in', 'POST', reformatForApi(userAttributes))
      .then(embedNewCSRFTokenIfPresent)
      .then(() => {
        dispatch(sessionChanged({ active: true }))
      })
  }
}

export const destroyUserSession = () => {
  return dispatch => {
    return fetchWithCSRF('/api/users/sign_out', 'DELETE')
      .then(embedNewCSRFTokenIfPresent)
      .then(() => dispatch(sessionChanged({ active: false })))
      .then(() => dispatch(resetTimerSettings()))
      .then(() => dispatch(resetTimer()))
  }
}

const resetTimerSettings = () => {
  return {
    type: RESET_TIMER_SETTINGS
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

export const updateTimerSettings = (timerSettings) => {
  return dispatch => {
    return fetchAuthenticatedResource(dispatch, '/api/timer_settings', 'PUT', timerSettings)
      .then((data) => dispatch(receiveTimerSettings(data)))
  }
}

const fetchAuthenticatedResource = (dispatch, endpoint, method, data) => {
  return fetchWithCSRF(endpoint, method, data)
    .catch(refreshIfInvalidAuthenticityToken)
    .catch((err) => updateSessionIfUnauthenticated(err, dispatch))
}

const refreshIfInvalidAuthenticityToken = (err) => {
  if (err.response.status === 422 && err.body.invalid_authenticity_token) {
    location.reload()
    return
  }
  else {
    throw err
  }
}

const updateSessionIfUnauthenticated = (err, dispatch) => {
  if (err.response.status === 401) {
    dispatch(sessionChanged({ active: false }))
  }

  throw err
}

const requestTimerSettings = () => {
  return {
    type: REQUEST_TIMER_SETTINGS
  }
}

const receiveTimerSettings = (settings) => {
  return {
    type: RECEIVE_TIMER_SETTINGS,
    settings: addTimerBuffer(settings)
  }
}

const addTimerBuffer = (settings) => {
  const result = {}
  Object.keys(settings)
    .forEach((key) => result[key] = settings[key] + BUFFER_SO_THAT_59_ALWAYS_SHOWN)
  return result
}

const userIsLoggedIn = (state) => {
  return state.session.active
}

export const fetchTimerSettingsIfLoggedIn = () => {
  return (dispatch, getState) => {
    if (userIsLoggedIn(getState())) {
      dispatch(requestTimerSettings())
      return fetchAuthenticatedResource(dispatch, '/api/timer_settings', 'GET')
        .then((data) => dispatch(receiveTimerSettings(data)))
    }
  }
}

export const fetchTimerSettingsIfNotCached = () => {
  return (dispatch, getState) => {
    if (!arePersistedTimerSettingsInState(getState())) {
      return fetchTimerSettingsIfLoggedIn()(dispatch, getState)
    }
  }
}

const arePersistedTimerSettingsInState = (state) => {
  return state.timer.settings.id
}

export const openNewTaskModal = () => (
  { type: OPEN_NEW_TASK_MODAL }
)

export const closeNewTaskModal = () => (
  { type: CLOSE_NEW_TASK_MODAL }
)

export const receiveTask = (task) => (
  { type: RECEIVE_TASK, task: task }
)

function buildSubmissionError(err) {
  const {body} = err
  const new_err = Object.assign({}, body.errors)

  for (var key in new_err) {
    new_err[key] = new_err[key].join(', ')
  }

  new_err['_error'] = 'There were errors creating your task.'

  console.log(new_err)

  return new SubmissionError(new_err)
}

function handleCreateTaskError(err) {
  throw buildSubmissionError(err)
}

export const createTask = (task) => {
  return (dispatch) => {
    return fetchAuthenticatedResource(dispatch, '/api/tasks', 'POST', task)
      .then((task) => dispatch(receiveTask(task)))
      .then(() => { dispatch(closeNewTaskModal())})
      .catch(handleCreateTaskError)
  }
}

export const requestTasks = () => (
  { type: REQUEST_TASKS }
)

const receiveTasks = (tasks) => (
  { type: RECEIVE_TASKS, tasks: tasks }
)

const fetchTasks = () => {
  return (dispatch) => {
    dispatch(requestTasks())
    return fetchAuthenticatedResource(dispatch, '/api/tasks', 'GET')
      .then((tasks) => dispatch(receiveTasks(tasks)))
  }
}

function tasksAreInState(state) {
  return state.tasks.tasks.length > 0
}

export const fetchTasksIfNotCached = () => {
  return (dispatch, getState) => {
    if (!tasksAreInState(getState())) {
      dispatch(fetchTasks())
    }
  }
}
