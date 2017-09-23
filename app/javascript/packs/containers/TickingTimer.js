import Timer from '../components/Timer'
import { connect } from 'react-redux'
import { msTimeToString } from '../util'


const mapStateToProps = state => {
  return {
    time_remaining: msTimeToString(state.timer.time_remaining_ms)
  }
}

const mapDispatchToProps = () => ({})

const TickingTimer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)

export default TickingTimer
