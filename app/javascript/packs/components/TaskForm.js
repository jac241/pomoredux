import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Form, Input, Button, Message, Label} from 'semantic-ui-react'

const renderField = ({ input, label, type, meta: { touched, error }, required, autoFocus }) => (
  <Form.Field required={required} error={!!error}>
    <label>{label}</label>
    <Input {...input} type={type} autoFocus={autoFocus}/>
    {touched && error &&
      <Label basic pointing color='red'>{error}</Label>
    }
  </Form.Field>
)

class TaskForm extends React.Component {
  render() {
    const { handleSubmit, error, submitting } = this.props
    return (
      <Form onSubmit={handleSubmit} id='new_task' error={!!error}>
        <Message error content={error} />
        <Field
          id='task_title'
          name='title'
          component={renderField}
          label='Title'
          required
        />
        <Field
          id='task_estimated_num_pomodoros'
          name='estimated_num_pomodoros'
          component={renderField}
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
