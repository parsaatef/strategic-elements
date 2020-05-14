import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { IntlProvider } from 'react-intl';
import AppLocale from './languageProvider';
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
    let isAuthError = false;

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        if (
          extensions &&
          extensions.code &&
          extensions.code === 'UNAUTHENTICATED'
        ) {
          isAuthError = true;
        }
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }

    if (networkError && networkError.statusCode === 401) {
      isAuthError = true;
    } else {
      console.log('Network Error', networkError);
    }

    if (isAuthError === true && history.location.pathname !== SIGNIN) {
      // remove cached token on 401 from the server
      // store.dispatch(actions.signOut());
      localStorage.setItem('token', '');
      client.resetStore();
      history.push(SIGNIN);
    }

    // if (networkError.statusCode === 400) { localStorage.removeItem('token'); }
  }
});

const store = configureStore();

const currentAppLocale = AppLocale.fa;

render(
  <AppContainer>
    <ApolloProvider client={client}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <Root store={store} history={history} />
      </IntlProvider>
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
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <NextRoot store={store} history={history} />
          </IntlProvider>
        </ApolloProvider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
