import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import DefaultLayout from './layouts/DefaultLayout';
import AccountLayout from './layouts/AccountLayout';
import WorkbenchLayout from './layouts/WorkbenchLayout';

import Home from './containers/Home';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import Blog from './containers/Blog';
import NotFound from './containers/NotFound';

import './styles/globalStyles';

const query = gql`
  {
    account @client {
      loggedIn
      user {
        id
        username
      }
    }
  }
`;

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => (
            <DefaultLayout data={this.props.data}>
              <Home />
            </DefaultLayout>
          )}
        />
        <Route path="/signup" render={() => (
            <AccountLayout data={this.props.data}>
              <Signup />
            </AccountLayout>
          )}
        />
        <Route path="/signin" render={() => (
            <AccountLayout data={this.props.data}>
              <Signin />
            </AccountLayout>
          )}
        />
        <Route path="/blog" render={() => (
            <WorkbenchLayout data={this.props.data}>
              <Blog />
            </WorkbenchLayout>
          )}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default graphql(query)(App);
