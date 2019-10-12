import React from 'react'
import {connect} from 'react-redux'
import {Container, Loader} from 'semantic-ui-react'
import {fetchTask} from '../actions/index'
import TaskTimer from '../components/TaskTimer'

import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';


class TaskTimerPage extends React.Component {
  componentDidMount() {
    const { task, match, fetchTask } = this.props
    if (!task) {
      fetchTask(match.params.id)
    }
  }

  render() {

    const { task, requestingTask } = this.props
    return (
      <div>
        {
          task ? (
            <Container text>
              <TaskTimer task={task}/>
            </Container>
          ) : (
            <Loader active={requestingTask} inline='centered' />
          )
        }
        <SemanticToastContainer position='bottom-left'/>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props
  const { tasks, requestingTask } = state.tasks
  return {
    task: tasks.find(task => task.id === match.params.id),
    requestingTask
  }
}

export default connect(mapStateToProps, { fetchTask })(TaskTimerPage)
