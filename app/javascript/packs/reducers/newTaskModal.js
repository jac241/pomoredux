import {CLOSE_NEW_TASK_MODAL, OPEN_NEW_TASK_MODAL} from "../actions/index"
import {updateObject} from "../util"

const initialState = {
  open: false
}

function newTaskModal(state=initialState, action) {
  switch(action.type) {
    case OPEN_NEW_TASK_MODAL:
      return updateObject(state, { open: true })
    case CLOSE_NEW_TASK_MODAL:
      return updateObject(state, { open: false })
  }

  return state
}

export default newTaskModal