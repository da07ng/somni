import React, { Component } from 'react';
import { Container, Grid, Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SIGNIN = gql`
  mutation signin($account: String!, $password: String!) {
    signin(account: $account, password: $password) {
      id
      username
      email
    }
  }
`;

class Signin extends Component {
  constructor(props) {
    super(props);
    // this.onSubmit = this.onSubmit.bind(this);

    this.accountInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  async onSubmit(event, signin, client) {
    event.preventDefault();

    const account = this.accountInputRef.current.value;
    const password = this.passwordInputRef.current.value;

    console.log(account, password);

    try {
      const result = await signin({
        variables: { account: account, password: password }
      });

      if (result.data.signin) {
        client.writeData({
          data: {
            account: {
              __typename: 'Account',
              loggedIn: true,
              user: {
                __typename: 'User',
                id: result.data.signin.id,
                username: result.data.signin.username
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
      <Mutation mutation={SIGNIN}>
        {(signin, { client }) => (
          <div id="main">
            <Container>
              <Grid>
                <Grid.Row centered>
                  <Grid.Column mobile={16} tablet={8} computer={6}>
                    {/* <Form onSubmit={this.onSubmit}> */}
                    <Form
                      onSubmit={event => {
                        this.onSubmit(event, signin, client);
                      }}
                    >
                      <Form.Field>
                        <label>Account</label>
                        <input
                          type="text"
                          name="account"
                          ref={this.accountInputRef}
                          placeholder="Email or Username"
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
                        登录
                      </Button>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signin;
