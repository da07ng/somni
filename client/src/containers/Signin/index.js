import React, { Component } from 'react';
import { Container, Grid, Form, Button } from 'semantic-ui-react';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const account = this.refs.account.value;
    const password = this.refs.password.value;

    console.log(account, password);
  }

  render() {
    return (
      <div id="main">
        <Container>
          <Grid>
            <Grid.Row centered>
              <Grid.Column mobile={16} tablet={8} computer={6}>
                <Form onSubmit={this.onSubmit}>
                  <Form.Field>
                    <label>Account</label>
                    <input
                      type="text"
                      name="account"
                      ref="account"
                      placeholder="Email or Username"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input
                      type="password"
                      name="account"
                      ref="password"
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
    );
  }
}

export default Signin;
