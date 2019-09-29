import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SettingsForm from './SettingsForm'
import { fetchTimerSettingsIfLoggedIn, updateTimerSettings } from '../actions'
import { msToMinsString } from '../util'


class SettingsPage extends React.Component {
  componentDidMount = () => {
    document.title = 'Pomoredux | Settings'
    this.props.fetchTimerSettingsIfLoggedIn()
  }

  render() {
    return (
      <SettingsForm
        loading={this.props.loading}
        updateTimerSettings={this.props.updateTimerSettings}
        timerSettingsInMin={this.props.timerSettingsInMin}
      />
    );
  }
}

function mapStateToProps(state) {
  const timerSettingsInMs = state.timer.settings.lengths_by_mode_ms
  const timerSettingsInMin = {
    'pomodoro_length_in_min': msToMinsString(timerSettingsInMs['pomodoro']),
    'short_break_length_in_min': msToMinsString(timerSettingsInMs['short_break']),
    'long_break_length_in_min': msToMinsString(timerSettingsInMs['long_break'])
  }

  return {
    loading: state.timer.requestingSettings,
    timerSettingsInMin: timerSettingsInMin
  }
}

export default connect(
  mapStateToProps,
  { fetchTimerSettingsIfLoggedIn, updateTimerSettings }
)(SettingsPage)
