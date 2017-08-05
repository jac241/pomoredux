import { connect } from 'react-redux'
import { startTimer } from '../actions/index'
import { Button } from 'semantic-ui-react'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(startTimer())
    }
  }
}

const TimerButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button)

export default TimerButton
