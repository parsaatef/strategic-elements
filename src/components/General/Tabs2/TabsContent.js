// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

export default class TabsContent extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return <div className="smfp-ht-tabs-contents">{children}</div>;
  }
}
