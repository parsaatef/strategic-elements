// @flow
import * as React from 'react';
import TabsContent from './TabsContent';
import TabItems from './TabItems';

type Props = {
  children: [TabItems, TabsContent]
};

export const content = TabsContent;

class Tabs extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return <div className="smfp-horizontal-tabs">{children}</div>;
  }
}

export default Tabs;
