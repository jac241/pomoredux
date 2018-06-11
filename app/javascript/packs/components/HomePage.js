import React from 'react'
import {
  Container,
  Header,
  Segment,
  Grid
} from 'semantic-ui-react'
import { connect } from 'react-redux'

import { fetchTimerSettingsIfNotCached } from '../actions'
import TaskListPage from '../containers/TaskListPage'
import NewTaskModal from "./NewTaskModal"
import PomodoroTimer from './PomodoroTimer'
import DailyGoalsListPage from '../containers/DailyGoalsListPage'

class HomePage extends React.Component {
  getTimerSegmentStyle() {
    return this.props.userLoggedIn ? { marginTop: '5em'} : {}
  }

  render() {
    const { userLoggedIn, requestingTasks } = this.props
    return (
      <div >
        { userLoggedIn ||
          <React.Fragment>
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
            <Segment
              basic
              style={this.getTimerSegmentStyle()}
            >
              <PomodoroTimer />
            </Segment>
          </React.Fragment>
        }
        { userLoggedIn &&
          <Grid container stackable columns='2'>
            <Grid.Column id='daily_goals'>
              <Header as='h1' content='Daily Goals' />
              <Segment clearing vertical>
                <DailyGoalsListPage />
              </Segment>
            </Grid.Column>
            <Grid.Column id="tasks">
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
            </Grid.Column>
          </Grid>
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
