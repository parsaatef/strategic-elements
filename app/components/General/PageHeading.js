import React, { Component } from 'react';

export default class PageHeading extends Component<Props> {
  render() {
    const { className, title } = this.props;

    return (
      <div className={`animated fadeInDown fast ${className}`}>
        <h4>{title}</h4>
      </div>
    );
  }
}
