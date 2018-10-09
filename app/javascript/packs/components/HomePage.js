import React from 'react'
import {
  Container,
  Header,
  Segment,
  Grid,
  Button
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
              style={{ 
                padding: '1em 0em',
                marginBottom: '1.5em'
              }}
              vertical
              basic
            >
              <Container text>
                <Header
                  as='h1'
                  content='Welcome to Pomoredux!'
                  style={{
                    marginTop: '1em',
                  }}
                />
                <p style={{ fontSize: '1.33em' }}>
                  An app to help you create, track, and accomplish your goals!
                </p>
                <Button primary as='a' href='/signup'>Sign up!</Button>
              </Container>
            </Segment>
            <Segment
              vertical
              basic
              style={{
                marginTop: '1.5em'
              }}
            >
              <Grid divided container stackable verticalAlign='middle'>
                <Grid.Row>
                  <Grid.Column width={8}>
                      <Header
                        as='h2'
                        content='Use the Pomodoro Technique'
                      />
                      <p>
                        Pomoredux helps you use the Pomodoro Technique to help you accomplish your tasks and minimize distractions.
                        Sign up to use Pomoredux's task and goal tracking, or just use the Pomodoro Timer if that's all you need!
                      </p>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <PomodoroTimer />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
