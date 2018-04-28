import React from 'react'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {Form, Input, Button, Message, Label} from 'semantic-ui-react'

import FormInput from '../components/FormInput'
import {excuseCreatorFor, createExcuse} from '../ducks/excuses.js'

let ExcuseForm = ({ handleSubmit }) => (
  <Form id='new_excuse' onSubmit={handleSubmit}>
    <Field
      id='excuse_description'
      name='description'
      component={FormInput}
    />
    <Button type='submit' positive>Save</Button>
  </Form>
)

ExcuseForm = reduxForm({form: 'excuse'})(ExcuseForm)

const mapDispatchToProps = (dispatch, ownProps) => {
  const {excusable} = ownProps
  const createExcuse = excuseCreatorFor(excusable)
  return {
    onSubmit: (excuse) => (dispatch(createExcuse(excuse)))
  }
}

export default connect(null, mapDispatchToProps)(ExcuseForm)
