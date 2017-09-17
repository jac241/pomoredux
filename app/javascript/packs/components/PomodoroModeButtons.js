import React from 'react'
import { Responsive, Container, Button } from 'semantic-ui-react'
import PomodoroModeButton from '../containers/PomodoroModeButton'

const PomodoroModeButtons = ({mode}) => {
  return (
    <Container
      textAlign='center'
    >
      <Responsive as={Button.Group} compact size='tiny' maxWidth={350}>
        <PomodoroModeButton mode='pomodoro'>Pomodoro</PomodoroModeButton>
        <PomodoroModeButton mode='short_break'>Short Break</PomodoroModeButton>
        <PomodoroModeButton mode='long_break'>Long Break</PomodoroModeButton>
      </Responsive>
      <Responsive as={Button.Group} minWidth={351}>
        <PomodoroModeButton mode='pomodoro'>Pomodoro</PomodoroModeButton>
        <PomodoroModeButton mode='short_break'>Short Break</PomodoroModeButton>
        <PomodoroModeButton mode='long_break'>Long Break</PomodoroModeButton>
      </Responsive>
    </Container>
  )
}

export default PomodoroModeButtons
