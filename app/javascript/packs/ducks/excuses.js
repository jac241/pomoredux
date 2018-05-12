import {
  readEndpoint,
  createResource,
  deleteResource,
  updateResource,
} from 'redux-json-api'

import {closeExcuseModal} from './excuseModal'

export const excuseCreatorFor = (excusable) => (excuse) => (dispatch) => (
  dispatch(createExcuse(excuse, excusable))
)

export const createExcuse = (excuse, excusable) => (dispatch) => (
  dispatch(createResource(newExcuseFor(excuse, excusable)))
    .then(() => dispatch(closeExcuseModal()))
)

const newExcuseFor = (excuse, excusable) => {
  const excusableType = excusable.type.slice(0, -1)
  return {
    type: 'excuses',
    attributes: {
      ...excuse
    },
    relationships: {
      [excusableType]: {
        data: {
          type: excusableType,
          id: excusable.id
        }
      }
    }
  }
}

export const excuseForExcusable = (state, excusable) => {
  const todaysExcuse = excusable.relationships.todays_excuse
  if (!todaysExcuse.data) {
    return null
  }

  const excuses = state.api[todaysExcuse.data.type]

  if (!excuses) {
    return null
  }

  return excuses.data.find((excuse) => (
    excuse.id === todaysExcuse.data.id
  ))
}

export const updateExcuse = (excuse, excuseAttributes) => (dispatch) => {
  const updatedExcuse = {
    ...excuse,
    attributes: {
      ...excuseAttributes
    }
  }
  return dispatch(updateResource(updatedExcuse))
    .then(() => dispatch(closeExcuseModal()))
}
