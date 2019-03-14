import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Routes from '../Routes';

type Props = {};

export default class FullPageLayout extends Component<Props> {
  props: Props;

  render() {
    return (
      <Scrollbars className="container-fluid smfp-Custom-scrollbar-container">
        <Routes />
      </Scrollbars>
    );
  }
}
