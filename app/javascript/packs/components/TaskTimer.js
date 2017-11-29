import React from 'react'
import {Header, Label} from 'semantic-ui-react'
import PomodoroTimer from './PomodoroTimer'
import {activateTask} from '../actions/index'
import {connect} from 'react-redux'

class TaskTimer extends React.Component {
  componentDidMount() {
    const { activateTask, task } = this.props
    activateTask(task)
  }

  render() {
    const { task, completedPomodoros } = this.props
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
          <Label.Detail>{completedPomodoros}</Label.Detail>
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

const getCompletedPomodorosCount = (state, task) => {
  const pomodoros = state.pomodoros.byTaskId[task.id]
  return pomodoros ? pomodoros.length : 0
}

const mapStateToProps = (state, { task }) => {
  return {
    completedPomodoros: getCompletedPomodorosCount(state, task)
  }
}

export default connect(mapStateToProps, { activateTask })(TaskTimer)
