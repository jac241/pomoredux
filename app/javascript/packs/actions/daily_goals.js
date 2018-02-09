import {readEndpoint} from 'redux-json-api'

export const fetchDailyGoals = () => {
  return dispatch => {
    return dispatch(readEndpoint('/api/daily_goals'))
  }
}
