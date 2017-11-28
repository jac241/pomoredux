import React from 'react'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { verifyUserSession } from '../actions'
import {Segment} from 'semantic-ui-react'


class AuthenticatedComponentContainer extends React.Component {
  componentDidMount() {
    const { isLoggedIn, dispatch, wasVerified } = this.props
    if (!isLoggedIn && !wasVerified) {
      dispatch(verifyUserSession())
    }
  }

  render() {
    const { isLoggedIn, wasVerified } = this.props
    if (!isLoggedIn && !wasVerified) {
      return (
        <Segment loading/>
      )
    } else if (!isLoggedIn && wasVerified) {
      return (<Redirect to='login' />)
    } else {
      return this.props.children
    }
  }
}

function mapStateToProps(state) {
  const { active, wasVerified } = state.session
  return {
    isLoggedIn: active,
    wasVerified
  }
}

export default connect(mapStateToProps)(AuthenticatedComponentContainer)
