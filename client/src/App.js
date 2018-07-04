import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import DefaultLayout from './layouts/DefaultLayout';
import WorkbenchLayout from './layouts/WorkbenchLayout';

import Home from './containers/Home';
import Signup from './containers/Signup';
import NotFound from './containers/NotFound';

import './styles/global-styles';

const query = gql`
  {
    currentUser @client {
      username
    }
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
  }

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
            <WorkbenchLayout data={this.props.data}>
              <Signup />
            </WorkbenchLayout>
          )}
        />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default graphql(query)(App);
