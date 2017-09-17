import Timer from '../components/Timer'
import { connect } from 'react-redux'

const msTimeToString = (time_ms) => {
  let time_tmp = time_ms
  let ms = time_tmp % 1000
  time_tmp = (time_tmp - ms) / 1000
  var secs = time_tmp % 60
  time_tmp = (time_tmp - secs) / 60
  var mins = time_tmp % 60

  if (mins < 10) {
    mins = '0' + mins
  }

  if (secs < 10) {
    secs = '0' + secs
  }

  return mins + ':' + secs
}

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
