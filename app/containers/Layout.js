import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Content from './Content';
import Routes from '../Routes';
import FullPageLayout from './FullPageLayout';

type Props = {
  location: object
};

class Layout extends Component<Props> {
  props: Props;

  render() {
    const { location } = this.props;

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

export default connect(mapStateToProps)(Layout);
