import React from 'react'
import {
  Container,
  Segment,
  Header,
  Form,
  Input,
  Button,
  Message
} from 'semantic-ui-react'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    remember_me: false,
    error: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { email, password, remember_me } = this.state
    this.props.createUserSession({ email, password, remember_me })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({error: 'Incorrect email or password.'})
        } else {
          this.setState({error: 'An error occurred.'})
        }
      })
  }

  toggle = (e) => {
    this.setState({ remember_me: !this.state.remember_me })
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
            content='Log In'
            style={{
              marginTop: '2em',
              marginBottom: '0.75em'
            }}
          />
        </Segment>
        <Form
          id='new_user_session'
          onSubmit={this.handleSubmit}
          error={!!this.state.error}
        >
          <Segment>
            <Message error content={this.state.error} />
            <Form.Field
              id='user_email'
              name='email'
              control={Input}
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleChange}
              autoFocus
            />
            <Form.Field
              id='user_password'
              name='password'
              control={Input}
              placeholder='Password'
              type='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Form.Checkbox
              id='user_remember_me'
              name='remember_me'
              label='Keep me signed in'
              checked={this.state.remember_me}
              onChange={this.toggle}
            />
            <Button fluid size='large'>Log In</Button>
          </Segment>
        </Form>
      </Container>
    )
  }
}

export default LoginForm
