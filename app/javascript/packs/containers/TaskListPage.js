import React from 'react'
import TaskList from '../components/TaskList'
import {connect} from 'react-redux'
import {fetchTasksIfNecessary, fetchPomodorosIfNecessary} from '../actions/index'
import {Loader} from 'semantic-ui-react'

class TaskListPage extends React.Component {
  componentDidMount() {
    const { fetchTasksIfNecessary, fetchPomodorosIfNecessary } = this.props

    fetchTasksIfNecessary()
    fetchPomodorosIfNecessary()
  }

  render() {
    const {tasks, pomodorosByTaskId, requestingTasks} = this.props

    return (
      <React.Fragment>
        {
          requestingTasks ? (
            <Loader active/>
          ) : (
            <TaskList
              tasks={tasks}
              pomodorosByTaskId={pomodorosByTaskId}
            />
          )
        }
      </React.Fragment>
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
  { fetchTasksIfNecessary, fetchPomodorosIfNecessary }
)(TaskListPage)