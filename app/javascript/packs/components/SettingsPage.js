import React from 'react'
import { connect } from 'react-redux'

import SettingsForm from './SettingsForm'
import { fetchTimerSettingsIfLoggedIn, updateTimerSettings } from '../actions'
import { msToMinsString } from '../util'


class SettingsPage extends React.Component {
  state = {
    loading: true
  }

  componentDidMount = () => {
    this.props.fetchTimerSettingsIfLoggedIn()
      .then(() => this.setState({ loading: false }))
  }

  render() {
    return (
      <SettingsForm
        loading={this.state.loading}
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
    timerSettingsInMin: timerSettingsInMin
  }
}

export default connect(
  mapStateToProps,
  { fetchTimerSettingsIfLoggedIn, updateTimerSettings })(SettingsPage)
