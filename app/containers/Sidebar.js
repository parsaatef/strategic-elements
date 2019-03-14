import React, { Component } from 'react';
import Menu from '../components/Menu/Menu';

type Props = {};

export default class Sidebar extends Component<Props> {
  props: Props;

  render() {
    return (
      <React.Fragment>
        <Menu />
      </React.Fragment>
    );
  }
}
