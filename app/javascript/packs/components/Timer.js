import React from 'react'
import {
  Segment,
  Header,
  Button
} from 'semantic-ui-react'

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
      <Button>
        Start
      </Button>
    </Segment>
  </div>
)

export default Timer
