import React, { Component } from 'react';

export default class HeadingOfPage extends Component<Props> {
  render() {
    const { className, title } = this.props;

    return (
      <div className={className}>
        <h4>{title}</h4>
      </div>
    );
  }
}
