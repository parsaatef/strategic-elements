import React, { Component } from 'react';
import Routes from '../Routes';

type Props = {};

export default class FullPageLayout extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="container-fluid smfp-Custom-scrollbar-container">
        <Routes />
      </div>
    );
  }
}
