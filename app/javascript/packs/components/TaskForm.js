import React from 'react'
//import compose from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Button, Modal } from 'semantic-ui-react'

class TaskForm extends React.Component {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit} id='new_task'>
        <Form.Field>
          <label>Title</label>
          <Field name="title" autoFocus component={Input} />
        </Form.Field>
        <Form.Field>
          <label>Estimate</label>
          <Field name="estimated_num_pomodoros" type="number" component={Input} />
        </Form.Field>
        <Button type="submit" positive loading={this.props.submitting}>Add</Button>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'task'
})(TaskForm)
