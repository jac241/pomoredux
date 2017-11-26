import React from 'react'
import TaskList from '../components/TaskList'
import {connect} from 'react-redux'
import {fetchTasks} from '../actions/index'

class TaskListPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks())
  }

  render() {
    const {tasks} = this.props

    return (
      <TaskList tasks={tasks} />
    )
  }
}

const mapStateToProps = (state) => (
  {tasks: state.tasks.tasks}
)

export default connect(mapStateToProps)(TaskListPage)