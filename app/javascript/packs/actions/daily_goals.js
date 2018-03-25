import {readEndpoint, createResource, deleteResource} from 'redux-json-api'
import find from 'lodash/find'

const DAILY_GOALS_ENDPOINT = '/daily_goals'

export const fetchDailyGoals = () => {
  return dispatch => {
    return dispatch(readEndpoint(DAILY_GOALS_ENDPOINT))
  }
}

export const toggleGoalAccomplished = (goal) => {
  return (dispatch, getState) => {
    if (!goal.attributes.accomplished_today) {
      return dispatch(createResource(newAccomplishmentFor(goal)))
    } else {
      return dispatch(deleteResource(todaysAccomplishmentFor(goal)))
        .then(() => (dispatch(readEndpoint(DAILY_GOALS_ENDPOINT))))
    }
  }
}

const todaysAccomplishmentFor = (goal) => {
  return goal.relationships.todays_accomplishment.data
}

const anyAccomplishments = (state) => (
  state.api.accomplishments
)


export const newAccomplishmentFor = (goal) => {
  return {
    type: 'accomplishments',
    relationships: {
      goal: {
        data: {
          type: 'goals',
          id: goal.id
        }
      }
    }
  }
}
