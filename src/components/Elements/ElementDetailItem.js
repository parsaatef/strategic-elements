import React, { Component } from 'react';
import { getUnit } from '../../utils/utility';

export default class ElementDetailItem extends Component<Props> {
  render() {
    const { value, name, unit } = this.props;

    return (
      <div className="detail-line animated fadeInUp fast animation-auto-delay">
        <div className="detail-line-content">
          <div className="detail-line-circle">
            <span className="detail-line-circle-inner">
              {value}
              <span className="detail-line-unit">
                {unit ? getUnit('option', unit) : ''}
              </span>
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
