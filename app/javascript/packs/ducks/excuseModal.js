const OPEN_EXCUSE_MODAL = 'OPEN_EXCUSE_MODAL'
const CLOSE_EXCUSE_MODAL = 'CLOSE_EXCUSE_MODAL'

const initialState = {
  open: false,
  excusable: null,
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case OPEN_EXCUSE_MODAL:
      return {
        ...state,
        open: true,
        excusable: action.excusable
      }
    case CLOSE_EXCUSE_MODAL:
      return {
        ...state,
        open: false,
        excusable: null
      }

    default: return state
  }
}

export const openExcuseModal = (excusable) => (
  {
    type: OPEN_EXCUSE_MODAL,
    excusable: excusable
  }
)

export const closeExcuseModal = () => ({ type: CLOSE_EXCUSE_MODAL })
