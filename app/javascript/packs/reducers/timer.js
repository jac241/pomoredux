import { TIMER_LENGTH_MS, TIMER_LENGTHS_MS } from '../settings'
import {
  TIMER_TICK,
  TIMER_START,
  TIMER_STOP,
  TIMER_RESET,
  TIMER_MODE_CHANGE,
  REQUEST_TIMER_SETTINGS,
  RECEIVE_TIMER_SETTINGS,
  RESET_TIMER_SETTINGS
} from '../actions/index'
import omit from 'lodash/omit'

const initialState = {
  time_remaining_ms: TIMER_LENGTHS_MS['pomodoro'],
  mode: 'pomodoro',
  active: false,
  settings: {
    lengths_by_mode_ms: TIMER_LENGTHS_MS,
  },
  requestingSettings: false
}

function timer(state=initialState, action) {
  switch(action.type) {
    case TIMER_TICK:
      return {
        ...state,
        time_remaining_ms: action.time_remaining_ms
      }
    case TIMER_START:
      return {
        ...state,
        active: true,
        time_remaining_ms: state.settings.lengths_by_mode_ms[state.mode]
      }
    case TIMER_STOP:
      return {
        ...state,
        active: false,
        time_remaining_ms: 0
      }
    case TIMER_RESET:
      return {
        ...state,
        active: false,
        time_remaining_ms: state.settings.lengths_by_mode_ms[state.mode]
      }
    case TIMER_MODE_CHANGE:
      return {
        ...state,
        mode: action.newMode,
        active: false,
        time_remaining_ms: state.settings.lengths_by_mode_ms[action.newMode]
      }
    case REQUEST_TIMER_SETTINGS:
      return {
        ...state,
        requestingSettings: true
      }
    case RECEIVE_TIMER_SETTINGS:
      let updates = {
        requestingSettings: false,
        settings: {
          id: action.settings.id,
          volume: action.settings.volume,
          lengths_by_mode_ms: omit(action.settings, ['id', 'volume'])
        }
      }

      if (!state.active) {
        updates['time_remaining_ms'] = updates.settings.lengths_by_mode_ms[state.mode]
      }

      return {
        ...state,
        ...updates
      }
    case RESET_TIMER_SETTINGS:
      return {
        ...state,
        settings: {
          lengths_by_mode_ms: TIMER_LENGTHS_MS
        }
      }
  }
  return state
}

export default timer
