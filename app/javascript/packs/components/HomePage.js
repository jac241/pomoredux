import React from 'react'
import {
  Container,
  Header,
  Segment
} from 'semantic-ui-react'
import { connect } from 'react-redux'

import { fetchTimerSettingsIfNotCached } from '../actions'
import TaskListPage from '../containers/TaskListPage'
import NewTaskModal from "./NewTaskModal"
import PomodoroTimer from './PomodoroTimer'

class HomePage extends React.Component {
  getTimerSegmentStyle() {
    return this.props.userLoggedIn ? { marginTop: '5em'} : {}
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
          <PomodoroTimer />
        </Segment>
        { userLoggedIn &&
          <Container id="task_section" text>
            <div>
              <Header as='h1' floated='left' content='Tasks' />
              <div style={{float: 'right'}}>
                <NewTaskModal />
              </div>
              <div style={{clear: 'both'}} />
            </div>
            <Segment clearing vertical>
              <TaskListPage/>
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
  }
}

export default connect(mapStateToProps)(HomePage)
