import React from 'react'
import {
  Container,
  Header,
  Segment,
  Message
} from 'semantic-ui-react'

import TickingTimer from '../containers/TickingTimer'
import SelectablePomodoroModeButtons from '../containers/SelectablePomodoroModeButtons'

class FlashMessageContainer extends React.Component {
  render() {
    let flash = null;
    let state = this.props.redirectionState;
    if (state && state.flash) {
      flash = (
        <Message positive style={{marginTop:'1em'}}>
          <Message.Header content={state.flash.message} />
        </Message>
      )
    }
    return (
      <div>
        { flash }
      </div>
    )
  }
}

class HomePage extends React.Component {
  render() {
    return (
      <div >
        <FlashMessageContainer redirectionState={this.props.location.state} />
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
              style={{
                marginTop: '3em',
                marginBottom: '1.5em'
              }}
            />
          </Container>
        </Segment>
        <SelectablePomodoroModeButtons />
        <TickingTimer />
      </div>
    )
  }
}

export default HomePage
