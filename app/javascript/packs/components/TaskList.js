import React from 'react'
import {Card, Placeholder} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Task = ({task: { id, title, estimated_num_pomodoros}, pomodoros, isRefreshingTasks}) => {
  return (
    <Card id={`task_${id}`} as={Link} to={`/tasks/${id}`}>
      <Card.Content>
        { isRefreshingTasks ? (
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        ) : (
          <Card.Header content={title} />
        )}
      </Card.Content>
      <Card.Content extra>
        { isRefreshingTasks ? (
          <Placeholder>
            <Placeholder.Line length='short'/>
          </Placeholder>
        ) : (
          <React.Fragment>
            <span className='right floated'> {`Completed: ${pomodoros ? pomodoros.length : 0}`}</span>
            {`Estimated: ${estimated_num_pomodoros}`}
          </React.Fragment>
        )}
      </Card.Content>
    </Card>
  )
}

Task.defaultProps = {
  creating: false
}

const TaskList = ({tasks, pomodorosByTaskId, isRefreshingTasks}) => (
  <Card.Group id='task_list' itemsPerRow={1}>
    { tasks.map((task, index) =>(
      <Task
        task={task}
        pomodoros={pomodorosByTaskId[task.id]}
        key={index}
        index={index}
        sortIndex={index}
        isRefreshingTasks={isRefreshingTasks}
      />
    ))}
  </Card.Group>
)

export default TaskList
