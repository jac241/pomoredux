import {readEndpoint, createResource} from 'redux-json-api'

export const fetchDailyGoals = () => {
  return dispatch => {
    return dispatch(readEndpoint('/daily_goals'))
  }
}

export const markGoalAccomplished = (goal) => {
  console.log(accomplishmentFor(goal))
  return dispatch => {
    return dispatch(createResource(accomplishmentFor(goal)))
  }
}

export const accomplishmentFor = (goal) => {
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
