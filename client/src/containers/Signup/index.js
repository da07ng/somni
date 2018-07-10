import React, { Component } from 'react';
import { Container, Grid, Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SIGNUP = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

class Signup extends Component {
  constructor(props) {
    super(props);
    // this.onSubmit = this.onSubmit.bind(this);

    this.usernameInputRef = React.createRef();
    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  async onSubmit(event, signup, client) {
    event.preventDefault();

    const username = this.usernameInputRef.current.value;
    const email = this.emailInputRef.current.value;
    const password = this.passwordInputRef.current.value;

    try {
      const result = await signup({
        variables: { username: username, email: email, password: password }
      });

      if (result.data.signup) {
        client.writeData({
          data: {
            account: {
              __typename: 'Account',
              loggedIn: true,
              user: {
                __typename: 'User',
                id: result.data.signup.id,
                username: result.data.signup.username
              }
            }
          }
        });
      }
    } catch (error) {
      // console.log(error);
    }
  }

  render() {
    return (
      <Mutation mutation={SIGNUP}>
        {(signup, { client }) => (
          <div id="main">
            <Container>
              <Grid centered>
                <Grid.Column mobile={16} tablet={8} computer={6}>
                  {/* <Form onSubmit={this.onSubmit}> */}
                  <Form
                    onSubmit={event => {
                      this.onSubmit(event, signup, client);
                    }}
                  >
                    <Form.Field>
                      <label>Username</label>
                      <input
                        type="text"
                        name="username"
                        ref={this.usernameInputRef}
                        placeholder="Username"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        ref={this.emailInputRef}
                        placeholder="Email"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Password</label>
                      <input
                        type="password"
                        name="account"
                        ref={this.passwordInputRef}
                        placeholder="Password"
                      />
                    </Form.Field>
                    <Button primary type="submit">
                      注册
                    </Button>
                  </Form>
                </Grid.Column>
              </Grid>
            </Container>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signup;
