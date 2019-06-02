import React, { Component } from 'react';

export default class ElementDetailItem extends Component<Props> {
  render() {
    const { value, name } = this.props;

    return (
      <div className="detail-line">
        <div className="detail-line-content">
          <div className="detail-line-circle">
            <span className="detail-line-circle-inner">
              {value}
              <span className="detail-line-unit">تن</span>
            </span>
          </div>
          <div className="inner-content">
            <h4 className="title">{name}</h4>
          </div>
        </div>
      </div>
    );
  }
}
