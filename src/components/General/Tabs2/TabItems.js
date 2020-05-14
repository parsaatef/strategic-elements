// @flow
import * as React from 'react';
import Tab from './Tab';

type Props = {
  children: Tab
};

export default class TabItems extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return <div className="smfp-ht-tabs-items">{children}</div>;
  }
}
