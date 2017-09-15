import { connect } from 'react-redux'
import React from 'react'
import { Button } from 'semantic-ui-react'
import { changeTimerMode, startTimer } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    active: state.timer.mode === ownProps.mode
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(changeTimerMode(ownProps.mode))
      dispatch(startTimer(ownProps.mode))
    }
  }
}

const PomodoroModeButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)

export default PomodoroModeButton
