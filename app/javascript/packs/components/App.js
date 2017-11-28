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
import SettingsPage from '../components/SettingsPage'
import AuthenticatedComponentContainer from '../containers/AuthenticatedComponentContainer'
import TaskTimerPage from '../containers/TaskTimerPage'


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
          <Route path="/signup" component={RegistrationFormPage}/>
          <Route path="/login" component={LoginPage}/>
          <AuthenticatedComponentContainer>
            <Route path="/settings" component={SettingsPage}/>
            <Route path="/tasks/:id" component={TaskTimerPage}/>
          </AuthenticatedComponentContainer>
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect()(App))
