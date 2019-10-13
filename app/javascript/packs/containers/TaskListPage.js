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
    const {
      tasks,
      pomodorosByTaskId,
      shouldShowSpinner,
      isRefreshingTasks
    } = this.props

    return (
      <SpinWhileLoading loading={shouldShowSpinner}>
        <TaskList
          tasks={tasks}
          pomodorosByTaskId={pomodorosByTaskId}
          isRefreshingTasks={isRefreshingTasks}
        />
      </SpinWhileLoading>
    )
  }
}

const mapStateToProps = (state) => {
  const { requestingTasks } = state.tasks
  const activeTasks = selectActiveTasks(state)

  return {
    pomodorosByTaskId: state.pomodoros.byTaskId,
    tasks: activeTasks,
    shouldShowSpinner: requestingTasks && activeTasks.length == 0,
    isRefreshingTasks: requestingTasks && activeTasks.length > 0
  }
}

const selectActiveTasks = (state) => state.tasks.tasks.filter(t => t.completed_at === null)

export default connect(
  mapStateToProps,
  { fetchTasks, fetchPomodorosIfNecessary }
)(TaskListPage)
