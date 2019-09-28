import React from 'react'
import TaskList from '../components/TaskList'
import {connect} from 'react-redux'
import {fetchTasks, fetchPomodorosIfNecessary} from '../actions/index'
import SpinWhileLoading from '../components/SpinWhileLoading'

class TaskListPage extends React.Component {
  componentDidMount() {
    const { fetchTasks, fetchPomodorosIfNecessary } = this.props

    fetchTasks()
    fetchPomodorosIfNecessary()
  }

  render() {
    const {tasks, pomodorosByTaskId, requestingTasks} = this.props

    return (
      <SpinWhileLoading loading={requestingTasks}>
        <TaskList
          tasks={tasks}
          pomodorosByTaskId={pomodorosByTaskId}
        />
      </SpinWhileLoading>
    )
  }
}

const mapStateToProps = (state) => {
  const { requestingTasks } = state.tasks

  return {
    pomodorosByTaskId: state.pomodoros.byTaskId,
    tasks: activeTasks(state),
    requestingTasks
  }
}

const activeTasks = (state) => state.tasks.tasks.filter(t => t.completed_at === null)

export default connect(
  mapStateToProps,
  { fetchTasks, fetchPomodorosIfNecessary }
)(TaskListPage)
