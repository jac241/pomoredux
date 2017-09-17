import React from 'react'
import {
  Grid,
  Segment,
  Container,
  Header,
  Form,
  Input,
  Button
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createUser } from '../actions'

class RegistrationForm extends React.Component {
  state = {
    email: '',
    password: '',
    password_confirmation: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { email, password, password_confirmation } = this.state
    this.props.createUser({ email, password, password_confirmation }).then(
      () => {},
      () => {}
    )
  }

  render() {
    return (
      <Container text textAlign='center'>
        <Segment
          vertical
          basic
        >
          <Header
            as='h1'
            content='Sign Up'
            style={{marginTop: '3em'}}
          />
        </Segment>
        <Form id='new_user' onSubmit={this.handleSubmit}>
          <Segment>
            <Form.Field
              id='user_email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              control={Input}
              placeholder='Email'
            />
            <Form.Field
              id='user_password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              control={Input}
              placeholder='Password'
              type='password'
            />
            <Form.Field
              id='user_password_confirmation'
              name='password_confirmation'
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              control={Input}
              placeholder='Confirm Password'
              type='password'
            />
            <Button fluid size='large'>Sign Up</Button>
          </Segment>
        </Form>
      </Container>
    )
  }
}

export default connect(null, { createUser })(RegistrationForm)
