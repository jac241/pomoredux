import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Form, Input, Button, Message, Label} from 'semantic-ui-react'

import FormInput from './FormInput'

class TaskForm extends React.Component {
  render() {
    const { handleSubmit, error, submitting } = this.props
    return (
      <Form onSubmit={handleSubmit} id='new_task' error={!!error}>
        <Message error content={error} />
        <Field
          id='task_title'
          name='title'
          component={FormInput}
          label='Title'
          required
          autoFocus
        />
        <Field
          id='task_estimated_num_pomodoros'
          name='estimated_num_pomodoros'
          component={FormInput}
          label='Estimated number of pomodoros to complete task'
          type='number'
          required
        />
        <Button type="submit" positive loading={submitting}>Add</Button>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'task'
})(TaskForm)
