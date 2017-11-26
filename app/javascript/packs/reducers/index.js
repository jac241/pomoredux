import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import timer from './timer'
import session from './session'
import newTaskModal from "./newTaskModal"
import tasks from './tasks'
import {SESSION_CHANGED} from '../actions/index'


const appReducer = combineReducers({
  timer,
  session,
  newTaskModal,
  tasks,
  form: formReducer
})

const rootReducer = (state, action) => {
  if (action.type === SESSION_CHANGED) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
