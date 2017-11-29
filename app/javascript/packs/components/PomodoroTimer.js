import React from 'react'
import SelectablePomodoroModeButtons from '../containers/SelectablePomodoroModeButtons'
import TickingTimer from '../containers/TickingTimer'
import {fetchTimerSettingsIfNotCached} from '../actions/index'
import {connect} from 'react-redux'

class PomodoroTimer extends React.Component {
  componentDidMount() {
    this.props.fetchTimerSettingsIfNotCached()
  }

  render() {
    return(
      <div>
        <SelectablePomodoroModeButtons />
        <TickingTimer />
      </div>
    )
  }
}

export default connect(null, { fetchTimerSettingsIfNotCached })(PomodoroTimer)