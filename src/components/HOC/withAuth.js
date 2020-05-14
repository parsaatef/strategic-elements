import React from 'react';
import { Redirect } from 'react-router-dom';
import { Query, ApolloConsumer } from 'react-apollo';
import { SIGNIN } from '../../constants/routes';
import { GET_CURRENT_USER } from '../../queries';

const withAuth = conditionFunc => Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {
      if (loading) return null;

      return conditionFunc(data) ? (
        <Component {...props} />
      ) : (
        <ApolloConsumer>
          {client => {
            localStorage.setItem('token', '');
            client.resetStore();
            return <Redirect to={SIGNIN} />;
          }}
        </ApolloConsumer>
      );
    }}
  </Query>
);

export default withAuth;
