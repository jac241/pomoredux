import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'

import HomePage from './HomePage'
import NavBar from './NavBar'
import RegistrationFormPage from '../containers/RegistrationFormPage'
import LoginPage from '../containers/LoginPage'

const App = props => (
  <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/signup" component={RegistrationFormPage}/>
      <Route exact path="/login" component={LoginPage}/>
    </Switch>
  </div>
)

export default App
