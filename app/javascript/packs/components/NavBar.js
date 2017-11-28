import React from 'react'
import {
  Menu,
  Container, Button, Icon
} from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { destroyUserSession } from '../actions'

const LogOutButton = ({loading, children}) => (
    <Button loading={loading}>{children}</Button>
)

class NavBar extends React.Component {
  handleLogOut = () => {
    const { destroyUserSession, history } = this.props
    destroyUserSession().then(() => history.push('/'))
  }

  render() {
    const { userSignedIn, isLoggingOut } = this.props
    return (
      <Menu size='large' style={{marginBottom: '1em'}}>
        <Menu.Item as={Link} to='/'>Home</Menu.Item>
        {
          userSignedIn ? (
            <Menu.Menu position='right'>
              <Menu.Item as={Link} to='/settings' name='settings'>Settings</Menu.Item>
              <Menu.Item
                onClick={this.handleLogOut}
              >
                { isLoggingOut ? <Icon loading name='spinner'/> : 'Log Out' }
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position='right'>
              <Menu.Item as={Link} to='/signup' name='signup'>Sign Up</Menu.Item>
              <Menu.Item as={Link} to='/login' name='login'>Log In</Menu.Item>
            </Menu.Menu>
          )
        }
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  const { active, isLoggingOut } = state.session
  return {
    userSignedIn: active,
    isLoggingOut
  }
}

export default withRouter(connect(mapStateToProps, { destroyUserSession })(NavBar))
