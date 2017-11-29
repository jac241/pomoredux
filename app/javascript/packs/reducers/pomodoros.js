import {RECEIVE_POMODORO, RECEIVE_POMODOROS, REQUEST_POMODORO, REQUESTING_POMODOROS} from '../actions/index'
import {updateObject} from '../util'
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
      return updateObject(state, { requestingPomodoro: true })
    case RECEIVE_POMODORO:
      return updateObject(state, {
        byId: updateObject(state.byId, { [action.pomodoro.id]: action.pomodoro }),
        byTaskId: updateObject(state.byTaskId, {
          [action.pomodoro.task_id]: addPomodoroByTaskId(state.byTaskId, action.pomodoro)
        }),
        requestingPomodoro: false
      })
    case REQUESTING_POMODOROS:
      return updateObject(state, { requestingPomodoros: true })
    case RECEIVE_POMODOROS:
      return updateObject(state, {
        byId: updateObject(state.byId, groupBy(action.pomodoros, 'id')),
        byTaskId: updateObject(state.byTaskId, groupPomodorosByTaskId(action.pomodoros)),
        requestingPomodoros: false,
      })
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