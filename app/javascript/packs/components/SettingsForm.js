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
    volume: 10,
    pomodoro_length_in_min: '',
    short_break_length_in_min: '',
    long_break_length_in_min: '',
    changesSaved: false,
    saving: false,
    errors: {},
    full_messages: []
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.loading) {
      this.setState({ ...nextProps.timerSettings })
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, changesSaved: false })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({ saving: true })
    this.props.updateTimerSettings(
      pick(this.state, [
        'volume',
        'pomodoro_length_in_min',
        'short_break_length_in_min',
        'long_break_length_in_min'
      ]))
      .then(() => this.setState({ changesSaved: true, errors: {}, full_messages: [] }))
      .catch((err) => {
        const {errors, full_messages} = err.body
        this.setState({changesSaved: false, errors, full_messages})
      })
      .then(() => this.setState({ saving: false }))
  }

  render() {
    return (
      <Container text textAlign='center'>
        <Segment vertical basic>
          <Header
            as='h1'
            content='Timer Settings'
            style={{
              marginTop: '2em',
              marginBottom: '0.75em'
            }}
          />
        </Segment>
        <Form
          id='edit_timer_settings'
          onSubmit={this.handleSubmit}
          success={this.state.changesSaved}
          loading={this.props.loading}
          error={this.state.full_messages.length > 0}
        >
          <Segment textAlign='left'>
            <Message
              success
              header='Changes saved!'
              content='Your settings have been updated.'
            />
            <Form.Input
              id='timer_settings_volume'
              label={`Volume: ${this.state.volume}`}
              min={0}
              max={10}
              name='volume'
              onChange={this.handleChange}
              step={1}
              type='range'
              value={this.state.volume}
            />
            <Form.Field
              id='timer_settings_pomodoro_length_in_min'
              name='pomodoro_length_in_min'
              label='Pomodoro Length'
              control='input'
              type='number'
              value={this.state.pomodoro_length_in_min}
              onChange={this.handleChange}
              error={!!this.state.errors.pomodoro_length_ms}
            />
            <Form.Field
              id='timer_settings_short_break_length_in_min'
              name='short_break_length_in_min'
              label='Short Break Length'
              control='input'
              type='number'
              value={this.state.short_break_length_in_min}
              onChange={this.handleChange}
              error={!!this.state.errors.short_break_length_ms}
            />
            <Form.Field
              id='timer_settings_long_break_length_in_min'
              name='long_break_length_in_min'
              label='Long Break Length'
              control='input'
              type='number'
              value={this.state.long_break_length_in_min}
              onChange={this.handleChange}
              error={!!this.state.errors.long_break_length_ms}
            />
            <Button
              fluid
              size='large'
              loading={this.state.saving}
            >
              Save Changes
            </Button>
            <Message error>
              <Message.Header content='There were errors saving your settings.' />
              <Container textAlign='left'>
                <ul>
                  { this.state.full_messages.map((message, i) => <li key={i}>{message}</li>)}
                </ul>
              </Container>
            </Message>
          </Segment>
        </Form>
      </Container>
    );
  }
}

export default SettingsForm
