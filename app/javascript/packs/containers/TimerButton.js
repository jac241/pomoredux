import { connect } from 'react-redux'
import { startTimer, resetTimer } from '../actions/index'
import { Button } from 'semantic-ui-react'

const mapStateToProps = (state, ownProps) => {
  const isTimerActive = state.timer.active
  let result = {
    timer_active: isTimerActive,
    content: isTimerActive ? 'Reset' : 'Start'
  }
  return result
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch: dispatch }
}

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  const { timer_active, content } = propsFromState
  const { dispatch } = propsFromDispatch

  return {
    content: content,
    onClick: () => {
      if (!timer_active) {
        dispatch(startTimer())
      } else {
        dispatch(resetTimer())
      }
    }
  }
}

const TimerButton = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Button)

export default TimerButton
