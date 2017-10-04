import React from 'react'
import {
  Card,
  Container
} from 'semantic-ui-react'
import {
  SortableContainer,
  SortableElement
} from 'react-sortable-hoc'

const Task = SortableElement((props) => (
  <Card>
    <Card.Content>
      <Card.Header content={props.title} />
    </Card.Content>
    <Card.Content extra>
      <span className='right floated'> {`Completed: ${props.completed}`} </span>
      {`Estimated: ${props.estimated}`}
    </Card.Content>
  </Card>
))

const TaskList = SortableContainer(({tasks}) => (
  <Container>
    <Card.Group itemsPerRow={1}>
      { tasks.map((task, index) =>(
        <Task
          title={task.title}
          completed={task.completed}
          estimated={task.estimated}
          key={index}
          index={index}
          sortIndex={index}
        />
      ))}
    </Card.Group>
  </Container>
))

export default TaskList
