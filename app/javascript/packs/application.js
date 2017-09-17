/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import 'semantic-ui-css/semantic.min.css'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import RegistrationFormPage from './containers/RegistrationFormPage'
import LoginPage from './containers/LoginPage'
import pomoApp from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  pomoApp,
  composeEnhancers(applyMiddleware(thunk))
)

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/signup" component={RegistrationFormPage}/>
            <Route exact path="/login" component={LoginPage}/>
          </Switch>
        </div>
      </Router>
    </Provider>,
    document.getElementById('root'),
  )
})
