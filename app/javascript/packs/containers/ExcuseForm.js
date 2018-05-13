import React from 'react'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {Form, Input, Button, Message, Label} from 'semantic-ui-react'

import FormInput from '../components/FormInput'
import {
  excuseCreatorFor,
  createExcuse,
  updateExcuse,
  destroyExcuse,
  excuseForExcusable,
} from '../ducks/excuses.js'
import {domId} from '../util'

let ExcuseForm = ({ excuse, handleSubmit, destroyExcuse }) => {
  const formId = excuse ? `excuse_${excuse.id}` : 'new_excuse'
  return (
    <Form id={formId} onSubmit={handleSubmit}>
      <Field
        id='excuse_description'
        name='description'
        component={FormInput}
      />
      <Button type='submit' positive>Save</Button>
      { excuse &&
          <Button
            onClick={(event) => {
              event.preventDefault()
              return destroyExcuse()
            }}
            negative>Remove excuse
          </Button>
      }
    </Form>
  )
}
ExcuseForm = reduxForm({form: 'excuse'})(ExcuseForm)

const mapStateToProps = (state, ownProps) => {
  const {excuse, excusable} = ownProps

  return {
    initialValues: excuseAttributesFor(excuse),
    excuse,
  }
}

const excuseAttributesFor = (maybeExcuse) => {
  return maybeExcuse ? maybeExcuse.attributes : {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {excuse, excusable} = ownProps
  const createExcuse = excuseCreatorFor(excusable)
  return {
    destroyExcuse: () => { return dispatch(destroyExcuse(excuse)) },
    onSubmit: (excuseAttributes) => {
      if (excuse) {
        return dispatch(updateExcuse(excuse, excuseAttributes))
      }
      else {
        return dispatch(createExcuse(excuseAttributes))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExcuseForm)
