import { combineReducers } from 'redux'
import timer from './timer'
import session from './session'

const pomoApp = combineReducers({
  timer,
  session
})

export default pomoApp
