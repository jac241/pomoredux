import { BUFFER_SO_THAT_59_ALWAYS_SHOWN } from '../settings'
import plucksMp3 from '../assets/audio/plucks.mp3'
import plucksOgg from '../assets/audio/plucks.ogg'

import omit from 'lodash/omit'
import merge from 'lodash/merge'
import pick from 'lodash/pick'

import { Howl } from 'howler'
import {SubmissionError} from 'redux-form'
import {setAxiosConfig} from 'redux-json-api'

import humanize from 'underscore.string/humanize'

export const TIMER_START = 'TIMER_START'
export const TIMER_TICK = 'TIMER_TICK'
export const TIMER_STOP = 'TIMER_STOP'
export const TIMER_RESET = 'TIMER_RESET'
export const TIMER_MODE_CHANGE = 'TIMER_MODE_CHANGE'
export const SESSION_CHANGED = 'SESSION_CHANGED'
export const SESSION_VERIFIED = 'SESSION_VERIFIED'
export const REQUEST_LOG_OUT = 'REQUEST_LOG_OUT'
export const RECEIVE_LOG_OUT = 'RECEIVE_LOG_OUT'
export const REQUEST_TIMER_SETTINGS = 'REQUEST_TIMER_SETTINGS'
export const RECEIVE_TIMER_SETTINGS = 'RECEIVE_TIMER_SETTINGS'
export const RESET_TIMER_SETTINGS = 'RESET_TIMER_SETTINGS'
export const OPEN_NEW_TASK_MODAL = 'OPEN_NEW_TASK_MODAL'
export const CLOSE_NEW_TASK_MODAL = 'CLOSE_NEW_TASK_MODAL'
export const RECEIVE_TASK = 'RECEIVE_TASK'
export const REQUEST_TASKS = 'REQUEST_TASKS'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'
export const REQUEST_TASK = 'REQUEST_TASK'
export const ACTIVATE_TASK = 'ACTIVATE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const RECEIVE_UPDATED_TASK = 'RECEIVE_UPDATED_TASK'
export const REQUEST_POMODORO = 'REQUEST_POMODORO'
export const RECEIVE_POMODORO = 'RECEIVE_POMODORO'
export const REQUESTING_POMODOROS = 'REQUESTING_POMODOROS'
export const RECEIVE_POMODOROS = 'RECEIVE_POMODOROS'


const TICK_INTERVAL_MS = 1000

const MAX_VOLUME = 10

let timer = null
let end_time = null
let timerSound = new Howl({ src: [plucksMp3, plucksOgg] })

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
  return (dispatch, getState) => {
    playFinishedAudio(getState().timer.settings)
    dispatch({type: TIMER_STOP})
    dispatch(showNotificationIfEnabled())
    return dispatch(createPomodoroIfActiveTask(getState()))
  }
}

const showNotificationIfEnabled = () => {
  return (dispatch, getState) => {
    let state = getState()
    if (shouldNotify(canNotify(state))) {
      showNotification(selectTimer(state), selectVolume(state))
    }
  }
}

const shouldNotify = (settingsSayWeCanNotify) => {
  return settingsSayWeCanNotify && Notification.permission === 'granted'
}

const canNotify = (state) => {
  return state.timer.settings.can_notify
}

const selectTimer = (state) => state.timer
const selectVolume = (state) => state.timer.settings.volume

const showNotification = (timer, volume) => {
  new Notification(
    `${humanize(timer.mode)} finished!`,
    {
      silent: !shouldPlayNotificationSound(volume)
    }
  )
}

const shouldPlayNotificationSound = (volume) => volume == 0

const createPomodoroIfActiveTask = (state) => {
  return dispatch => {
    const activeTask = getActiveTask(state)
    if (activeTask && getActiveMode(state) === 'pomodoro') {
      dispatch(requestPomodoro())
      return fetchAuthenticatedResource(dispatch, activeTask.links.pomodoros, 'POST')
        .then((pomodoro) => dispatch(receivePomodoro(pomodoro)))
    }
  }
}

const getActiveTask = (state) => {
  const {activeTaskId} = state.tasks
  return state.tasks.tasks.find(t => t.id === activeTaskId)
}

const getActiveMode = (state) => state.timer.mode

const requestPomodoro = () => (
  { type: REQUEST_POMODORO }
)

const receivePomodoro = (pomodoro) => (
  { type: RECEIVE_POMODORO, pomodoro }
)

const playFinishedAudio = (timerSettings) => {
  timerSound.volume(timerSettings.volume / MAX_VOLUME)
  timerSound.play()
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

export const csrfToken = () => {
  const meta_tag = document.querySelector('meta[name="csrf-token"]')
  return meta_tag ? meta_tag.content : ''
}

export const createUser = (user_attributes) => {
  return dispatch => {
    return fetchWithCSRF('/api/users', 'post', user_attributes)
      .then(() => {
        dispatch(sessionChanged({ active: true }))
      })
      .then(() => { dispatch(setAxiosConfig(buildAxiosAPIConfig()))})
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
  if (err.response) {
    return err.response.text()
      .then((text) => {
        if (text.length > 0) {
          try {
            err.body = JSON.parse(text)
          } catch (parse_err) {
            console.error(text)
            console.error(parse_err, parse_err.stack)
          }
        }
        throw err
      })
  } else {
    throw err
  }
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
      .then(() => { dispatch(setAxiosConfig(buildAxiosAPIConfig()))})
  }
}

export const buildAxiosAPIConfig = () => (
  {
    baseURL: '/api',
    credentials: 'same-origin',
    headers: {
      'X-CSRF-Token': csrfToken(),
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
)

const requestLogOut = () => (
  { type: REQUEST_LOG_OUT }
)

const receiveLogOut = () => (
  { type: RECEIVE_LOG_OUT }
)

export const destroyUserSession = () => {
  return dispatch => {
    dispatch(requestLogOut())
    return fetchWithCSRF('/api/users/sign_out', 'DELETE')
      .then(embedNewCSRFTokenIfPresent)
      .then(() => dispatch(receiveLogOut()))
      .then(() => dispatch(sessionChanged({ active: false })))
      .then(() => dispatch(resetTimerSettings()))
      .then(() => dispatch(resetTimer()))
      .then(() => dispatch(setAxiosConfig(buildAxiosAPIConfig())))
      .catch(() => dispatch(receiveLogOut()))
  }
}

const userSessionVerified = (session) => (
  { type: SESSION_VERIFIED, session: session }
)

export const verifyUserSession = () => {
  return dispatch => {
    return fetchAuthenticatedResource(dispatch, '/api/current_user', 'GET')
      .then(() => dispatch(userSessionVerified({ active: true })))
      .catch((err) => {
        dispatch(userSessionVerified())
        throw err
      })
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
  if (err.response && err.response.status === 422 && err.body.invalid_authenticity_token) {
    location.reload()
    return
  }
  else {
    throw err
  }
}

const updateSessionIfUnauthenticated = (err, dispatch) => {
  if (err.response && err.response.status === 401) {
    dispatch(userSessionVerified({ active: false }))
  }

  throw err
}

const requestTimerSettings = () => {
  return {
    type: REQUEST_TIMER_SETTINGS
  }
}

const receiveTimerSettings = (settings) => {
  return (dispatch) => {
    dispatch({
      type: RECEIVE_TIMER_SETTINGS,
      settings: addTimerBuffer(settings)
    })
    dispatch(() => dispatch(tryToEnableDesktopNotifications()))
  }
}

const addTimerBuffer = (settings) => {
  const result = {}
  let keysThatDoNotNeedBuffer = ['id', 'volume', 'can_notify']
  Object.keys(omit(settings, keysThatDoNotNeedBuffer))
    .forEach((key) => {
      result[key] = settings[key] + BUFFER_SO_THAT_59_ALWAYS_SHOWN
    })
  return merge(result, pick(settings, keysThatDoNotNeedBuffer))
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

const tryToEnableDesktopNotifications = () => {
  return (dispatch, getState) => {
    if (getState().timer.settings.can_notify) {
      enableDestopNotifications()
    }
  }
}

const enableDestopNotifications = () => {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }

  if (Notification.permission !== "denied") {
    Notification.requestPermission()
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

  for (let key in new_err) {
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

export const fetchTasks = () => {
  return (dispatch) => {
    dispatch(requestTasks())
    return fetchAuthenticatedResource(dispatch, '/api/tasks', 'GET')
      .then((tasks) => dispatch(receiveTasks(tasks)))
  }
}

const tasksAreInState = (state) => (
  state.tasks.tasks.length > 0
)

const onlyTaskIsActiveTask = (state) => {
  const { activeTaskId, tasks } = state.tasks
  return tasks.length === 1 && activeTaskId === tasks[0].id
}

const requestTask = () => (
 { type: REQUEST_TASK }
)

export const fetchTask = (id) => {
  return dispatch => {
    dispatch(requestTask())
    return fetchAuthenticatedResource(dispatch, `/api/tasks/${id}`, 'GET')
      .then((task) => dispatch(receiveTask(task)))
  }
}

export const activateTask = (task) => (
  { type: ACTIVATE_TASK, task }
)

export const completeActiveTask = () => {
  return (dispatch, getState) => {
    const activeTask = getActiveTask(getState())
    dispatch(updateTask())
    return fetchAuthenticatedResource(dispatch, activeTask.links.self, 'PATCH', {
      completed: true
    }).then((task) => dispatch(receiveUpdatedTask(task)))
  }
}

const updateTask = () => ({ type: UPDATE_TASK })
const receiveUpdatedTask = (task) => ({ type: RECEIVE_UPDATED_TASK, task })

export const fetchPomodorosForTask = (task) => {
  return dispatch => {
    dispatch(requestPomodoros())
    return fetchAuthenticatedResource(dispatch, task.links.pomodoros, 'GET')
      .then((pomodoros) => dispatch(receivePomodoros(pomodoros)))
  }
}

const requestPomodoros = () => {
  return {type: REQUESTING_POMODOROS}
}

const receivePomodoros = (pomodoros) => (
  { type: RECEIVE_POMODOROS, pomodoros }
)

export const fetchPomodorosIfNecessary = () => {
  return (dispatch, getState) => {
    const state = getState()
    if (!pomodorosAreInState(state) || onlyPomodorosBelongToActiveTask(state)) {
      console.log('Requesting all pomodoros')
      dispatch(requestPomodoros())
      return fetchAuthenticatedResource(dispatch, '/api/pomodoros', 'GET')
        .then((pomodoros) => dispatch(receivePomodoros(pomodoros)))
    }
  }
}

const pomodorosAreInState = (state) => (Object.keys(state.pomodoros.byId).length > 0)

const onlyPomodorosBelongToActiveTask = (state) => {
  const owningTaskIds = Object.keys(state.pomodoros.byTaskId)
  return owningTaskIds.length == 1 && owningTaskIds[0] === state.tasks.activeTaskId
}
