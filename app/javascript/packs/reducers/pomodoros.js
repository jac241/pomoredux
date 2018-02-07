import {RECEIVE_POMODORO, RECEIVE_POMODOROS, REQUEST_POMODORO, REQUESTING_POMODOROS} from '../actions/index'
import groupBy from 'lodash/groupBy'

const initialState = {
  requestingPomodoro: false,
  requestingPomodoros: false,
  byId: {},
  byTaskId: {}
}

const pomodoros = (state=initialState, action) => {
  switch(action.type) {
    case REQUEST_POMODORO:
      return {
        ...state,
        requestingPomodoro: true
      }
    case RECEIVE_POMODORO:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.pomodoro.id]: action.pomodoro
        },
        byTaskId: {
          ...state.byTaskId,
          [action.pomodoro.task_id]: addPomodoroByTaskId(state.byTaskId, action.pomodoro)
        },
        requestingPomodoro: false
      }
    case REQUESTING_POMODOROS:
      return {
        ...state,
        requestingPomodoros: true
      }
    case RECEIVE_POMODOROS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...groupBy(action.pomodoros, 'id')
        },
        byTaskId: {
          ...state.byTaskId,
          ...groupPomodorosByTaskId(action.pomodoros)
        },
        requestingPomodoros: false,
      }
  }

  return state
}

const addPomodoroByTaskId = (pomodorosByTaskId, pomodoro) => {
  let existingPomodoros = pomodorosByTaskId[pomodoro.task_id]

  if (existingPomodoros !== undefined) {
    return existingPomodoros.concat(pomodoro.id)
  } else {
    return [ pomodoro.id ]
  }
}

const groupPomodorosByTaskId = (pomodoros) => {
  const pomodorosByTaskId = groupBy(pomodoros, 'task_id')

  for (let taskId in pomodorosByTaskId) {
    pomodorosByTaskId[taskId] = pomodorosByTaskId[taskId].map(p => p.id)
  }

  return pomodorosByTaskId
}

export default pomodoros
