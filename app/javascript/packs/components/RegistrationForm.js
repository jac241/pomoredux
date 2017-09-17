import React from 'react'
import {
  Grid,
  Segment,
  Container,
  Header,
  Form,
  Input,
  Button,
  Message
} from 'semantic-ui-react'

class RegistrationForm extends React.Component {
  state = {
    email: '',
    password: '',
    password_confirmation: '',
    errors: {},
    full_messages: []
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { email, password, password_confirmation } = this.state
    this.props.createUser({ email, password, password_confirmation })
      .catch((err) => err.response.json())
      .then((data) => {
        const { errors, full_messages } = data
        this.setState({ errors, full_messages })
        console.log(data)
      })
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
        <Form id='new_user' onSubmit={this.handleSubmit} error={this.state.full_messages.length > 0}>
          <Segment>
            <Form.Field
              id='user_email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              control={Input}
              placeholder='Email'
              error={!!this.state.errors.email}
            />
            <Form.Field
              id='user_password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              control={Input}
              placeholder='Password'
              type='password'
              error={!!this.state.errors.password}
            />
            <Form.Field
              id='user_password_confirmation'
              name='password_confirmation'
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              control={Input}
              placeholder='Confirm Password'
              type='password'
              error={!!this.state.errors.password_confirmation}
            />
            <Button fluid size='large'>Sign Up</Button>
            <Message
              error
            >
              <Message.Header content='There were errors creating your account.' />
              <Container textAlign='left'>
                <ul>
                  { this.state.full_messages.map((message, i) => <li key={i}>{message}</li>)}
                </ul>
              </Container>
            </Message>
          </Segment>
        </Form>
      </Container>
    )
  }
}

export default RegistrationForm
