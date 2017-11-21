import React from 'react'
import {
  Modal,
  Button
} from 'semantic-ui-react'
import TaskForm from './TaskForm'
import {closeNewTaskModal, createTask, openNewTaskModal} from "../actions/index"
import {connect} from "react-redux"

const NewTaskModal = ({dispatch, open}) => (
  <Modal
    trigger={<Button onClick={() => { dispatch(openNewTaskModal()) }}>Add a task</Button>}
    open={open}
    onClose={() => dispatch(closeNewTaskModal())}
  >
    <Modal.Header>New task</Modal.Header>
    <Modal.Content>
      <TaskForm onSubmit={(task) => { dispatch(createTask(task)) }}/>
    </Modal.Content>
  </Modal>
)

const mapStateToProps = (state) => {
  return {
    open: state.newTaskModal.open
  }
}

export default connect(mapStateToProps)(NewTaskModal)
