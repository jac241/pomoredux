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

const Registration = () => (
  <div>
    <Grid textAlign='center' >
      <Grid.Column style={{maxWidth: 450}}>
        <Segment
          textAlign='center'
          style={{ padding: '1em 0em'}}
          vertical
          basic
        >
          <Header
            as='h1'
            content='Sign Up'
            style={{marginTop: '3em'}}
          />
        </Segment>
        <Segment>
          <Form id='new_user'>
            <Form.Field
              id='user_username'
              name='user[username]'
              control={Input}
              placeholder='Username'
            />
            <Form.Field
              id='user_password'
              name='user[password]'
              control={Input}
              placeholder='Password'
              type='password'
            />
            <Form.Field
              id='user_password_confirmation'
              name='user[password_confirmation]'
              control={Input}
              placeholder='Confirm Password'
              type='password'
            />
            <Button fluid size='large'>Sign Up</Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  </div>
)

export default Registration
