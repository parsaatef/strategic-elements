// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: React.Node,
  isActive: boolean,
  link: string
};

export default class Tab extends React.Component<Props> {
  props: Props;

  render() {
    const { children, isActive, link } = this.props;

    if (link) {
      return (
        <Link
          to={link}
          className={`smfp-ht-tabs-item${isActive ? ' active' : ''}`}
        >
          {children}
        </Link>
      );
    }

    return (
      <div className={`smfp-ht-tabs-item${isActive ? ' active' : ''}`}>
        {children}
      </div>
    );
  }
}
