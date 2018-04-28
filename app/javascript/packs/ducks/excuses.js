import {readEndpoint, createResource, deleteResource} from 'redux-json-api'

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
