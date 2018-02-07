import {
  ACTIVATE_TASK, RECEIVE_TASK, RECEIVE_TASKS, RECEIVE_UPDATED_TASK, REQUEST_TASK, REQUEST_TASKS,
  UPDATE_TASK
} from '../actions/index'

const initialState = {
  tasks: [],
  requestingTasks: false,
  requestingTask: false,
  activeTaskId: null,
  updatingTask: false,
}

function tasks(state=initialState, action) {
  switch(action.type) {
    case RECEIVE_TASK:
      return {
        ...state,
        tasks: state.tasks.concat(action.task),
        requestingTask: false
      }
    case REQUEST_TASKS:
      return {
        ...state,
        requestingTasks: true
      }
    case RECEIVE_TASKS:
      return {
        ...state,
        tasks: action.tasks,
        requestingTasks: false
      }
    case REQUEST_TASK:
      return {
        ...state,
        requestingTask: true
      }
    case ACTIVATE_TASK:
      return {
        ...state,
        activeTaskId: action.task.id
      }
    case UPDATE_TASK:
      return {
        ...state,
        updatingTask: true
      }
    case RECEIVE_UPDATED_TASK:
      return {
        ...state,
        tasks: updatedTasks(state.tasks, action.task),
        updatingTask: false
      }
  }
  return state
}

const updatedTasks = (tasks, updatedTask) => {
  const taskIndex = tasks.findIndex(t => t.id === updatedTask.id)
  const updatedTasks = tasks.map((t, index) => {
    if (!(index === taskIndex)) {
      return t
    } else {
      return updatedTask
    }
  })
  return updatedTasks
}

export default tasks
