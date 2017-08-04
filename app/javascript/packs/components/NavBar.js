import React from 'react'
import {
  Menu,
  Container
} from 'semantic-ui-react'

const NavBar = () => (
  <Menu fixed='top' size='large'>
    <Container>
      <Menu.Item as='a' active>Home</Menu.Item>
    </Container>
  </Menu>
)

export default NavBar
