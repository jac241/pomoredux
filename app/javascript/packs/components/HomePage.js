import React from 'react'
import {
  Container,
  Header,
  Segment,
  Message
} from 'semantic-ui-react'
import { connect } from 'react-redux'

import { fetchTimerSettingsIfLoggedIn } from '../actions'
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
  getTimerSegmentStyle() {
    return this.props.userLoggedIn ? { marginTop: '5em'} : {}
  }

  componentDidMount() {
    this.props.dispatch(fetchTimerSettingsIfLoggedIn())
  }

  render() {
    return (
      <div >
        <FlashMessageContainer redirectionState={this.props.location.state} />
        { this.props.userLoggedIn ||
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
                  marginTop: '2em',
                  marginBottom: '1.5em'
                }}
              />
            </Container>
          </Segment>
        }
        <Segment
          basic
          style={this.getTimerSegmentStyle()}
        >
          <SelectablePomodoroModeButtons />
          <TickingTimer />
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.session.active
  }
}

export default connect(mapStateToProps)(HomePage)
