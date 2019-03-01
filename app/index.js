import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import { SIGNIN } from './constants/routes';
import './app.global.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }

    if (networkError && networkError.statusCode === 401) {
      // remove cached token on 401 from the server
      // store.dispatch(actions.signOut());
      localStorage.setItem('token', '');
      client.resetStore();
      history.push(SIGNIN);
    } else {
      console.log('Network Error', networkError);
    }

    // if (networkError.statusCode === 400) { localStorage.removeItem('token'); }
  }
});

const store = configureStore();

render(
  <AppContainer>
    <ApolloProvider client={client}>
      <Root store={store} history={history} />
    </ApolloProvider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <ApolloProvider client={client}>
          <NextRoot store={store} history={history} />
        </ApolloProvider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
