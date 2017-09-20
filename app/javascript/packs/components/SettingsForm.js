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
import pick from 'lodash/pick'

class SettingsForm extends React.Component {

  state = {
    pomodoro_length_in_min: '',
    short_break_length_in_min: '',
    long_break_length_in_min: '',
    changesSaved: false
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.updateTimerSettings(
      pick(this.state, [
        'pomodoro_length_in_min',
        'short_break_length_in_min',
        'long_break_length_in_min'
      ])
    ).then(() => this.setState({ changesSaved: true }))
  }

  render() {
    return (
      <Container text textAlign='center'>
        <Segment vertical basic>
          <Header as='h1' content='Timer Settings' style={{marginTop: '3em'}} />
        </Segment>
        <Form
          id='edit_timer_settings'
          onSubmit={this.handleSubmit}
          success={this.state.changesSaved}
        >
          <Segment textAlign='left'>
            <Form.Field
              id='timer_settings_pomodoro_length_in_min'
              name='pomodoro_length_in_min'
              label='Pomodoro Length'
              control='input'
              type='number'
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Form.Field
              id='timer_settings_short_break_length_in_min'
              name='short_break_length_in_min'
              label='Short Break Length'
              control='input'
              type='number'
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Form.Field
              id='timer_settings_long_break_length_in_min'
              name='long_break_length_in_min'
              label='Long Break Length'
              control='input'
              type='number'
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Button fluid size='large'>Save Changes</Button>
            <Message
              success
              header='Changes saved!'
              content='Your settings have been updated.'
            />
          </Segment>
        </Form>
      </Container>
    );
  }
}

export default SettingsForm
