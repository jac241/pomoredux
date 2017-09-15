import { connect } from 'react-redux'
import PomodoroModeButtons from '../components/PomodoroModeButtons'

const mapStateToProps = (state, ownProps) => {
  return {
   mode: state.timer.mode
  }
}

const SelectablePomodoroModeButtons = connect(
  mapStateToProps
)(PomodoroModeButtons)

export default SelectablePomodoroModeButtons
