// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

export default class Tab extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return <div className="smfp-ht-tabs-item active">{children}</div>;
  }
}
