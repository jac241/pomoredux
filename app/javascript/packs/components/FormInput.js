import React from 'react'
import {Form, Input, Label} from 'semantic-ui-react'

const FormInput = ({ input, label, type, meta: { touched, error }, required, autoFocus }) => (
  <Form.Field required={required} error={!!error}>
    <label>{label}</label>
    <Input {...input} type={type} autoFocus={autoFocus}/>
    {touched && error &&
      <Label basic pointing color='red'>{error}</Label>
    }
  </Form.Field>
)

export default FormInput
