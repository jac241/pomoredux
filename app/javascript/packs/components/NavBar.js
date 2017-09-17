import React from 'react'
import {
  Menu,
  Container
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const NavBar = () => (
  <Menu size='large' style={{marginBottom: '1em'}}>
    <Menu.Item as={Link} to='/'>Home</Menu.Item>
    <Menu.Menu position='right'>
      <Menu.Item as={Link} to='/signup' name='signup'>
        Sign Up
      </Menu.Item>
    </Menu.Menu>
  </Menu>
)

export default NavBar
