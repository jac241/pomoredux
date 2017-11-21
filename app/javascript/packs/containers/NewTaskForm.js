import React from 'react'
import TaskForm from "../components/TaskForm"
import { connect } from 'react-redux'
import { createTask } from '../actions'

export default connect(
  null,
  { onSubmit: createTask }
)(TaskForm)

