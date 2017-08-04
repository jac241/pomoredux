import React from 'react'
import {
  Container,
  Header,
  Segment
} from 'semantic-ui-react'

import NavBar from './NavBar'

const HomePage = () => (
  <div>
    <NavBar />
    <Segment
      textAlign='center'
      style={{ minHeight: 700, padding: '1em 0em'}}
      vertical
    >
      <Container text>
        <Header
          as='h1'
          content='Welcome to Pomoredux!'
          style={{marginTop: '3em'}}
        />
      </Container>
    </Segment>
  </div>
)

export default HomePage
