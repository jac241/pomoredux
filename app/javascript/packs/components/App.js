import React from 'react'
import { connect } from 'react-redux'
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom'

import { sessionChanged } from '../actions'
import HomePage from './HomePage'
import NavBar from './NavBar'
import RegistrationFormPage from '../containers/RegistrationFormPage'
import LoginPage from '../containers/LoginPage'

class App extends React.Component {

  componentWillMount() {
    const sessionActive =
      JSON.parse(
        document.querySelector('#session').dataset.sessionActive
      )

    this.props.dispatch(sessionChanged({ active: sessionActive }))
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/signup" component={RegistrationFormPage}/>
          <Route exact path="/login" component={LoginPage}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect()(App))
