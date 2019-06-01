import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import Sidebar from './Sidebar';
import Content from './Content';
import Routes from '../Routes';
import FullPageLayout from './FullPageLayout';
import { SIGNIN } from '../constants/routes';

type Props = {
  location: object,
  history: object
};

class Layout extends Component<Props> {
  props: Props;

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  goForward = () => {
    const { history } = this.props;
    history.goForward();
  };

  signOut = client => {
    const { history } = this.props;
    // store.dispatch(actions.signOut());
    localStorage.setItem('token', '');
    client.resetStore();
    history.push(SIGNIN);
  };

  render() {
    const { location, history } = this.props;
    console.log('---this.props----', this.props);

    console.log('-----history can go-------', history.canGo);

    if (location.pathname === '/' || location.pathname === '/signin') {
      return <FullPageLayout />;
    }

    return (
      <div className="container-fluid">
        <div className="smfp-main-page">
          <div className="row">
            <div className="col-sm-3">
              <Sidebar />
            </div>

            <div className="col-sm-9">
              <Content>
                <div className="app-top-header">
                  <ApolloConsumer>
                    {client => (
                      <span
                        role="toolbar"
                        onKeyUp={e => console.log('onKeyUp', e)}
                        onClick={this.signOut.bind(this, client)}
                        className="logout-button toolbar-icon"
                        data-tid="logoutButton"
                      >
                        <i className="fal fa-user-times fa-2x" />
                      </span>
                    )}
                  </ApolloConsumer>

                  <span
                    role="toolbar"
                    onKeyUp={e => console.log('onKeyUp', e)}
                    onClick={this.goBack}
                    className="back-button toolbar-icon"
                    data-tid="backButton"
                  >
                    <i className="fal fa-arrow-right fa-2x" />
                  </span>
                  <span
                    role="toolbar"
                    onKeyUp={e => console.log('onKeyUp', e)}
                    onClick={this.goForward}
                    className="forward-button toolbar-icon"
                    data-tid="forwardButton"
                  >
                    <i className="fal fa-arrow-left fa-2x" />
                  </span>
                </div>
                <Routes />
              </Content>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.router.location
});

export default connect(mapStateToProps)(withRouter(Layout));
