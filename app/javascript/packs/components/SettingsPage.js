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
        timerSettings={this.props.timerSettings}
      />
    );
  }
}

function mapStateToProps(state) {
  const timerSettingsInMs = state.timer.settings.lengths_by_mode_ms
  const timerSettings = {
    'pomodoro_length_in_min': msToMinsString(timerSettingsInMs['pomodoro']),
    'short_break_length_in_min': msToMinsString(timerSettingsInMs['short_break']),
    'long_break_length_in_min': msToMinsString(timerSettingsInMs['long_break']),
    'volume': state.timer.settings.volume,
  }

  return {
    loading: state.timer.requestingSettings,
    timerSettings: timerSettings
  }
}

export default connect(
  mapStateToProps,
  { fetchTimerSettingsIfLoggedIn, updateTimerSettings }
)(SettingsPage)
