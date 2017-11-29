import {ACTIVATE_TASK, RECEIVE_TASK, RECEIVE_TASKS, REQUEST_TASK, REQUEST_TASKS} from '../actions/index'
import {updateObject} from '../util'

const initialState = {
  tasks: [],
  requestingTasks: false,
  requestingTask: false,
  activeTaskId: null
}

function tasks(state=initialState, action) {
  switch(action.type) {
    case RECEIVE_TASK:
      return updateObject(state, {
        tasks: state.tasks.concat(action.task),
        requestingTask: false
      })
    case REQUEST_TASKS:
      return updateObject(state, { requestingTasks: true })
    case RECEIVE_TASKS:
      return updateObject(state, {
        tasks: action.tasks,
        requestingTasks: false
      })
    case REQUEST_TASK:
      return updateObject(state, { requestingTask: true })
    case ACTIVATE_TASK:
      return updateObject(state, { activeTaskId: action.task.id })
  }
  return state
}

export default tasks