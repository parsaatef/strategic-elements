const popupTemplate = {
  popupTemplate: (geo, data) =>
    `<div id="popover" class="hoverinfo">
      <div class="close"></div>
      <ul>
        <li>
          <label class="title">${data.labels.title}</label>
          <span class="value">${data.title}</span>
        </li>
        <li>
          <label class="title">${data.labels.resourceValue}:</label>
          <span class="value">${data.resourceValue}</span>
        </li>
        <li>
          <label class="title">${data.labels.productionValue}:</label>
          <span class="value">${data.productionValue}</span>
        </li>
        <li>
          <label class="title">${data.labels.consumptionValue}:</label>
          <span class="value">${data.consumptionValue}</span>
        </li>
      </ul>
    </div>`
};

export default popupTemplate;

/*
import React, { Component } from 'react';

class popupTemplate extends Component<Props> {

  render() {
    const { data } = this.props;
    return(
      <div id="popover" className="hoverinfo">
        <div className="close" />
        <ul>
          <li>
            <span className="title">title:</span>
            <span className="value">{data.title}</span>
          </li>
          <li>
            <span className="title">resourceValue:</span>
            <span className="value">{data.resourceValue}</span>
          </li>
          <li>
            <span className="title">productionValue:</span>
            <span className="value">{data.productionValue}</span>
          </li>
          <li>
            <span className="title">consumptionValue:</span>
            <span className="value">{data.consumptionValue}</span>
          </li>
        </ul>
      </div>
    );
  }

};

export default popupTemplate;

*/
