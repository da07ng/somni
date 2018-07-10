import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import localState from './localState';

import './assets/css/semantic.min.css';

import App from './App';

import registerServiceWorker from './utils/registerServiceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  clientState: localState
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
