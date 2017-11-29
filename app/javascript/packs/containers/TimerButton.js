import { connect } from 'react-redux'
import { startTimer, resetTimer } from '../actions/index'
import { Button } from 'semantic-ui-react'

const mapStateToProps = (state, ownProps) => {
  const isTimerActive = state.timer.active
  const loading = state.pomodoros.requestingPomodoro
  return {
    timer_active: isTimerActive,
    content: isTimerActive ? 'Reset' : 'Start',
    mode: state.timer.mode,
    loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchStartTimer: (mode) => { dispatch(startTimer(mode)) },
    dispatchResetTimer: () => { dispatch(resetTimer()) }
  }
}

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  const { timer_active, content, mode, loading } = propsFromState
  const { dispatchStartTimer, dispatchResetTimer } = propsFromDispatch

  return {
    content: content,
    onClick: () => {
      if (!timer_active) {
        dispatchStartTimer(mode)
      } else {
        dispatchResetTimer()
      }
    },
    loading
  }
}

const TimerButton = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Button)

export default TimerButton
