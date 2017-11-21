import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import timer from './timer'
import session from './session'
import newTaskModal from "./newTaskModal"
import tasks from './tasks'


const pomoApp = combineReducers({
  timer,
  session,
  newTaskModal,
  tasks,
  form: formReducer
})

export default pomoApp
