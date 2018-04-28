const OPEN_EXCUSE_MODAL = 'OPEN_EXCUSE_MODAL'
const CLOSE_EXCUSE_MODAL = 'CLOSE_EXCUSE_MODAL'

const initialState = {
  open: false
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case OPEN_EXCUSE_MODAL:
      return {
        ...state,
        open: true
      }
    case CLOSE_EXCUSE_MODAL:
      return {
        ...state,
        open: false
      }

    default: return state
  }
}

export const openExcuseModal = () => ({ type: OPEN_EXCUSE_MODAL })
export const closeExcuseModal = () => ({ type: CLOSE_EXCUSE_MODAL })
