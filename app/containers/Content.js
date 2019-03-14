// @flow
import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

type Props = {
  children: React.Node
};

export default class Content extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <Scrollbars className="smfp-main-container smfp-Custom-scrollbar-container">
        <div className="smfp-main-container-inner">{children}</div>
      </Scrollbars>
    );
  }
}
