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
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import 'semantic-ui-css/semantic.min.css'

import App from './components/App'
import pomoApp from './reducers/index'

let store = createStore(
  pomoApp,
  applyMiddleware(thunk)
)

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )
})
