import React from 'react'
import {
  Container,
  Header,
  Segment
} from 'semantic-ui-react'

import NavBar from './NavBar'
import TickingTimer from '../containers/TickingTimer'
import SelectablePomodoroModeButtons from '../containers/SelectablePomodoroModeButtons'

const HomePage = () => (
  <div>
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
    <SelectablePomodoroModeButtons />
    <TickingTimer />
  </div>
)

export default HomePage
