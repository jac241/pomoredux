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
import NewTaskModal from "./NewTaskModal"

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
        <Container text>
          <Segment vertical>
            <TaskList tasks={this.props.tasks} pressDelay={250}/>
          </Segment>
          <Segment vertical>
            <NewTaskModal />
          </Segment>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.session.active,
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(HomePage)
