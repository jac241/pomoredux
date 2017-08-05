import React from 'react'
import {
  Container,
  Header,
  Segment
} from 'semantic-ui-react'

import NavBar from './NavBar'
import Timer from './Timer'

const HomePage = () => (
  <div>
    <NavBar />
    <Segment
      textAlign='center'
      style={{ padding: '1em 0em'}}
      vertical
      basic
    >
      <Container text>
        <Header
          as='h1'
          content='Welcome to Pomoredux!'
          style={{marginTop: '3em'}}
        />
      </Container>
    </Segment>
    <Timer time_remaining='25:00' />
  </div>
)

export default HomePage
