import React, { Component } from 'react';

export default class PageHeadingIcon extends Component<Props> {
  render() {
    const { className, title, icon } = this.props;

    return (
      <div
        className={`page-heading-icon animated fadeInDown fast ${className}`}
      >
        <h4 className="page-heading-icon-title">
          <span className={`page-heading-icon-icon ${icon}`} />
          {title}
        </h4>
      </div>
    );
  }
}
