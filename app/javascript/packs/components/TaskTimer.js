import React from 'react'
import {Header, Label, Loader} from 'semantic-ui-react'
import PomodoroTimer from './PomodoroTimer'
import {activateTask, fetchPomodorosForTask} from '../actions/index'
import {connect} from 'react-redux'

class TaskTimer extends React.Component {
  componentDidMount() {
    const { activateTask, task, completedPomodoros, fetchPomodorosForTask } = this.props
    activateTask(task)

    if (completedPomodoros === undefined) {
      fetchPomodorosForTask(task)
    }
  }

  render() {
    const { task, completedPomodoros, requestingPomodoros } = this.props

    let completed
    if (requestingPomodoros) {
      completed = <Loader active inline size='mini'/>
    } else if (completedPomodoros) {
      completed = completedPomodoros.length
    } else{
      completed = 0
    }

    return (
      <div>
        <Header as='h1' content={task.title}/>
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
      </div>
    )
  }
}

const mapStateToProps = (state, { task }) => {
  const { byTaskId, requestingPomodoros } = state.pomodoros
  return {
    completedPomodoros: byTaskId[task.id],
    requestingPomodoros
  }
}

export default connect(
  mapStateToProps,
  { activateTask, fetchPomodorosForTask }
)(TaskTimer)
