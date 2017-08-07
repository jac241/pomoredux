import React from 'react'
import {
  Segment,
  Header,
} from 'semantic-ui-react'
import TimerButton from '../containers/TimerButton'

const Timer = ({time_remaining}) => (
  <div>
    <Segment
      textAlign='center'
      size='huge'
      basic
      style={{marginTop: '1em'}}
      id='time_remaining'
    >
      {time_remaining}
    </Segment>
    <Segment
      textAlign='center'
      basic
    >
      <TimerButton />
    </Segment>
  </div>
)

export default Timer
