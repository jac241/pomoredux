import React from 'react'

import SettingsForm from './SettingsForm'
import { updateTimerSettings } from '../actions'
import { connect } from 'react-redux'

class SettingsPage extends React.Component {
  render() {
    return (
      <SettingsForm updateTimerSettings={this.props.updateTimerSettings} />
    );
  }
}

export default connect(null, { updateTimerSettings })(SettingsPage)
