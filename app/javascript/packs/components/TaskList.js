import React from 'react'
import {
  Card,
  Container,
  Segment,
  Button
} from 'semantic-ui-react'
import {
  SortableContainer,
  SortableElement
} from 'react-sortable-hoc'

import TaskForm from './TaskForm'

const Task = SortableElement((props) => (
  <Card>
    <Card.Content>
      <Card.Header content={props.title} />
    </Card.Content>
    <Card.Content extra>
      <span className='right floated'> {`Completed: 0`} </span>
      {`Estimated: ${props.estimated}`}
    </Card.Content>
  </Card>
))

Task.defaultProps = {
  creating: false
}

const TaskList = SortableContainer(({tasks}) => (
  <Card.Group id='tasks' itemsPerRow={1}>
    { tasks.map((task, index) =>(
      <Task
        title={task.title}
        completed={task.completed}
        estimated={task.estimated_num_pomodoros}
        key={index}
        index={index}
        sortIndex={index}
      />
    ))}
  </Card.Group>
))

export default TaskList
