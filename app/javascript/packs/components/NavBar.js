import React from 'react'
import {
  Menu,
  Container
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { destroyUserSession } from '../actions'

class NavBar extends React.Component {
  handleLogOut = () => {
    this.props.destroyUserSession()
  }

  render() {
    return (
      <Menu size='large' style={{marginBottom: '1em'}}>
        <Menu.Item as={Link} to='/'>Home</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to='/signup' name='signup'>Sign Up</Menu.Item>
          <Menu.Item as={Link} to='/login' name='login'>Log In</Menu.Item>
          <Menu.Item as={Link} to='/' onClick={this.handleLogOut}> Log Out</Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default connect(null, { destroyUserSession })(NavBar)
