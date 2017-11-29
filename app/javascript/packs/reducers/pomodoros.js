import {RECEIVE_POMODORO, REQUEST_POMODORO} from '../actions/index'
import {updateObject} from '../util'

const initialState = {
  requestingPomodoro: false,
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
        byTaskId: {
          [action.pomodoro.task_id]: addPomodoroByTaskId(state.byTaskId, action.pomodoro)
        },
        requestingPomodoro: false
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

export default pomodoros