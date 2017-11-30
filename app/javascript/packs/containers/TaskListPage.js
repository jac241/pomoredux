import React from 'react'
import TaskList from '../components/TaskList'
import {connect} from 'react-redux'
import {fetchTasksIfNecessary} from '../actions/index'

class TaskListPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchTasksIfNecessary())
  }

  render() {
    const {tasks, pomodorosByTaskId} = this.props

    return (
      <TaskList
        tasks={tasks}
        pomodorosByTaskId={pomodorosByTaskId}
      />
    )
  }
}

const mapStateToProps = (state) => (
  {
    tasks: state.tasks.tasks,
    pomodorosByTaskId: state.pomodoros.byTaskId
  }
)

export default connect(mapStateToProps)(TaskListPage)