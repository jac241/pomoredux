import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { createUser } from '../actions'
import RegistrationForm from '../components/RegistrationForm'

class RegistrationFormPage extends React.Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    document.title = 'Pomoredux | Sign Up'
  }

  createUser = (user_attributes) => {
    return this.props.createUser(user_attributes).then(
      () => { this.setState({ redirect: true })}
    )
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ? (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  flash: {
                    message: 'Your have successfully registered!'
                  }
                }
              }}
            />
          ) : (
            <RegistrationForm
              createUser={this.createUser}
            />
          )
        }
      </div>
    )
  }
}

export default connect(null, { createUser })(RegistrationFormPage)
