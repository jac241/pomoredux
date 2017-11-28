import React from 'react'
import {Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Task = (props) => {
  const { id, title, estimated_num_pomodoros} = props.task
  return (
    <Card id={`task_${id}`} as={Link} to={`/tasks/${id}`}>
      <Card.Content>
        <Card.Header content={title} />
      </Card.Content>
      <Card.Content extra>
        <span className='right floated'> {`Completed: 0`} </span>
        {`Estimated: ${estimated_num_pomodoros}`}
      </Card.Content>
    </Card>
  )
}

Task.defaultProps = {
  creating: false
}

const TaskList = ({tasks}) => (
  <Card.Group id='tasks' itemsPerRow={1}>
    { tasks.map((task, index) =>(
      <Task
        task={task}
        key={index}
        index={index}
        sortIndex={index}
      />
    ))}
  </Card.Group>
)

export default TaskList
