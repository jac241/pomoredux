import React from 'react'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class AuthenticatedComponentContainer extends React.Component {
  render() {
    return (this.props.isLoggedIn ?
      this.props.children :
      <Redirect to='login' />
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.session.active
  }
}

export default connect(mapStateToProps)(AuthenticatedComponentContainer)
