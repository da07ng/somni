import React, { Component } from 'react';
import { Container, Grid, Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      id
      username
      email
      password
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

  onSubmit(event, mutate) {
    event.preventDefault();

    const username = this.usernameInputRef.current.value;
    const email = this.emailInputRef.current.value;
    const password = this.passwordInputRef.current.value;

    console.log(username, email, password);

    mutate({
      variables: { username: username, email: email, password: password }
    });
  }

  render() {
    return (
      <Mutation mutation={ADD_USER}>
        {addUser => (
          <div id="main">
            <Container>
              <Grid centered>
                <Grid.Column mobile={16} tablet={8} computer={6}>
                  {/* <Form onSubmit={this.onSubmit}> */}
                  <Form
                    onSubmit={event => {
                      this.onSubmit(event, addUser);
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
