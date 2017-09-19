import React from 'react'
import {
  Menu,
  Container
} from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
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
        {
          this.props.userSignedIn ? (
            <Menu.Menu position='right'>
              <Menu.Item
                as={Link}
                onClick={this.handleLogOut}
                to={{
                  pathname: '/',
                  state: {
                    flash: {
                      message: 'You have logged out successfully!'
                    }
                  }
                }}
              >
                Log Out
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
  return {
    userSignedIn: state.session.active
  }
}

export default connect(mapStateToProps, { destroyUserSession })(NavBar)
