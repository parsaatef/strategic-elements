import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Content from './Content';
import Routes from '../Routes';

type Props = {};

export default class Layout extends Component<Props> {
  props: Props;

  render() {
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
