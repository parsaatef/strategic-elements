import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import Content from './Content';
import Routes from '../Routes';
import FullPageLayout from './FullPageLayout';

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
                  <span
                    role="toolbar"
                    onKeyUp={e => console.log('onKeyUp', e)}
                    onClick={this.goBack}
                    className="back-button"
                    data-tid="backButton"
                  >
                    <i className="fa fa-arrow-right fa-2x" />
                  </span>
                  <span
                    role="toolbar"
                    onKeyUp={e => console.log('onKeyUp', e)}
                    onClick={this.goForward}
                    className="forward-button"
                    data-tid="forwardButton"
                  >
                    <i className="fa fa-arrow-left fa-2x" />
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
