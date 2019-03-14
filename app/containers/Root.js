// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import type { Store } from '../reducers/types';
import Layout from './Layout';
/*
import FullPageLayout from './FullPageLayout';
*/

type Props = {
  store: Store,
  history: {}
};

class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;

    /*
        let pageLayout;

        if (history.location.pathname === "/" || history.location.pathname === "/signin") {
          pageLayout = <FullPageLayout />;
        } else {
          pageLayout = <Layout />;
        }
        console.log('this props:');
        console.log(this.props);
    */

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;
