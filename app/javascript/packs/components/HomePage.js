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
import TaskListPage from '../containers/TaskListPage'
import NewTaskModal from "./NewTaskModal"

class HomePage extends React.Component {
  getTimerSegmentStyle() {
    return this.props.userLoggedIn ? { marginTop: '5em'} : {}
  }

  componentDidMount() {
    this.props.dispatch(fetchTimerSettingsIfNotCached())
  }

  render() {
    const { userLoggedIn, requestingTasks } = this.props
    return (
      <div >
        { userLoggedIn ||
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
        { userLoggedIn &&
          <Container id="task_section" text>
            <Segment vertical loading={requestingTasks}>
              <TaskListPage/>
            </Segment>
            <Segment vertical>
              <NewTaskModal/>
            </Segment>
          </Container>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.session.active,
    requestingTasks: state.tasks.requestingTasks,
  }
}

export default connect(mapStateToProps)(HomePage)
