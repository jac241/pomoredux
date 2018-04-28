import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import timer from './timer'
import session from './session'
import newTaskModal from "./newTaskModal"
import tasks from './tasks'
import pomodoros from './pomodoros'
import {SESSION_CHANGED} from '../actions/index'
import {reducer as api} from 'redux-json-api'
import excuseModal from '../ducks/excuseModal.js'


const appReducer = combineReducers({
  api,
  timer,
  session,
  newTaskModal,
  tasks,
  pomodoros,
  excuseModal,
  form: formReducer
})

const rootReducer = (state, action) => {
  if (action.type === SESSION_CHANGED) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
