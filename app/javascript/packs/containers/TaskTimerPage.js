import React from 'react'
import {connect} from 'react-redux'
import {Container, Header, Label, Segment} from 'semantic-ui-react'
import PomodoroTimer from '../components/PomodoroTimer'
import {Redirect} from 'react-router-dom'

const TaskTimer = ({task}) => (
  <div>
    <Header as='h1' content={task.title} />
    <PomodoroTimer />
    <Label
      id='num_completed_pomodoros'
      size='big'
      style={{ float: 'left' }}
    >
      Completed
      <Label.Detail>0</Label.Detail>
    </Label>
    <Label
      size='big'
      style={{ float: 'right' }}
      id='estimated_num_pomodoros'
    >
      Estimated
      <Label.Detail>{task.estimated_num_pomodoros}</Label.Detail>
    </Label>
  </div>
)

class TaskTimerPage extends React.Component {
  render() {

    const { task } = this.props
    return (
      <div>
        {
          task ? (
            <Container text>
              <TaskTimer task={task}/>
            </Container>
          ) : (
            <Redirect to='/' />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props
  return {
    task: state.tasks.tasks.find(task => task.id === match.params.id)
  }
}

export default connect(mapStateToProps)(TaskTimerPage)