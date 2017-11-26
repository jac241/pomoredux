import {RECEIVE_TASK, RECEIVE_TASKS, REQUEST_TASKS} from '../actions/index'
import {updateObject} from '../util'

const initialState = {
  tasks: [],
  requestingTasks: false
}

function session(state=initialState, action) {
  switch(action.type) {
    case RECEIVE_TASK:
      return updateObject(state, {
        tasks: state.tasks.concat(action.task)
      })
    case REQUEST_TASKS:
      return updateObject(state, { requestingTasks: true })
    case RECEIVE_TASKS:
      return updateObject(state, {
        tasks: action.tasks,
        requestingTasks: false
      })
  }
  return state
}

export default session