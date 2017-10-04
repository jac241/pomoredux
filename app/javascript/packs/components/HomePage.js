import React from 'react'
import {
  Container,
  Header,
  Segment
} from 'semantic-ui-react'
import { connect } from 'react-redux'

import { fetchTimerSettingsIfNotCached } from '../actions'
import TickingTimer from '../containers/TickingTimer'
import SelectablePomodoroModeButtons from '../containers/SelectablePomodoroModeButtons'
import TaskList from './TaskList'


const tasks = [
  {
    title: 'Finish pomoredux',
    completed: 1,
    estimated: 2
  },
  {
    title: 'Finish power hour creator',
    completed: 1,
    estimated: 2
  }
]


class HomePage extends React.Component {
  getTimerSegmentStyle() {
    return this.props.userLoggedIn ? { marginTop: '5em'} : {}
  }

  componentDidMount() {
    this.props.dispatch(fetchTimerSettingsIfNotCached())
  }

  render() {
    return (
      <div >
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
        <Segment basic>
          <TaskList tasks={tasks} pressDelay={250}/>
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
