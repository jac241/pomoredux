import React from 'react'
import {Button, Container, Header, Label, Loader} from 'semantic-ui-react'
import PomodoroTimer from './PomodoroTimer'
import {activateTask, fetchPomodorosForTask, completeActiveTask} from '../actions/index'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const tasksPath = '/'

class TaskTimer extends React.Component {
  componentDidMount() {
    const { activateTask, task, completedPomodoros, fetchPomodorosForTask } = this.props
    activateTask(task)

    if (completedPomodoros === undefined) {
      fetchPomodorosForTask(task)
    }

    document.title = `Pomoredux | ${task.title}`
  }

  completeTask = () => {
    const { completeActiveTask, history } = this.props
    completeActiveTask().then(() => history.push(tasksPath))
  }

  render() {
    const {
      task,
      completedPomodoros,
      requestingPomodoros,
      completeActiveTask,
      updatingTask,
    } = this.props

    let completed
    if (requestingPomodoros) {
      completed = <Loader active inline size='mini'/>
    } else if (completedPomodoros) {
      completed = completedPomodoros.length
    } else {
      completed = 0
    }

    return (
      <div>
        <Header as='h1' content={task.title} floated='left'/>
        <Button
          content='Complete'
          style={{float: 'right'}}
          onClick={this.completeTask}
          loading={updatingTask}
        />
        <div style={{clear: 'both'}} />
        <Container text>
          <PomodoroTimer/>
          <Label
            id='num_completed_pomodoros'
            size='big'
            style={{float: 'left'}}
          >
            Completed
            <Label.Detail>{completed}</Label.Detail>
          </Label>
          <Label
            size='big'
            style={{float: 'right'}}
            id='estimated_num_pomodoros'
          >
            Estimated
            <Label.Detail>{task.estimated_num_pomodoros}</Label.Detail>
          </Label>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state, { task }) => {
  const { byTaskId, requestingPomodoros } = state.pomodoros
  const { updatingTask } = state.tasks
  return {
    completedPomodoros: byTaskId[task.id],
    requestingPomodoros,
    updatingTask
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { activateTask, fetchPomodorosForTask, completeActiveTask }
  )(TaskTimer)
)
