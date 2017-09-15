import React from 'react'
import { Segment, Button } from 'semantic-ui-react'
import PomodoroModeButton from '../containers/PomodoroModeButton'

const PomodoroModeButtons = ({mode}) => {
  return (
    <Segment
      textAlign='center'
      basic
    >
      <Button.Group>
        <PomodoroModeButton mode='pomodoro'>Pomodoro</PomodoroModeButton>
        <PomodoroModeButton mode='short_break'>Short Break</PomodoroModeButton>
        <PomodoroModeButton mode='long_break'>Long Break</PomodoroModeButton>
      </Button.Group>
    </Segment>
  )
}

export default PomodoroModeButtons
