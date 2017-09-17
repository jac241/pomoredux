import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


import { createUserSession } from '../actions'
import LoginForm from '../components/LoginForm'

class LoginPage extends React.Component {
  state  = {
    redirect: false
  }

  createUserSession = (user_attributes) => {
    return this.props.createUserSession(user_attributes).then(
      () => { this.setState({ redirect: true })}
    )
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ? (
            <Redirect to='/' />
          ) : (
            <LoginForm createUserSession={this.createUserSession} />
          )
        }
      </div>
    )
  }
}

export default connect(null, { createUserSession })(LoginPage)
