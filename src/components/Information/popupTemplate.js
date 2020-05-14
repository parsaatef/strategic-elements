const popupTemplate = {
  popupTemplate: (geo, data) => {
    let col1 = ``;
    let col2 = ``;
    let index = 1;

    Object.keys(data.labels).forEach(item => {
      if (data[item]) {
        if (index < 5) {
          col1 += `
            <li>
              <label class="title">${data.labels[item]}:</label>
              <span class="value">${data[item]}</span>
            </li>
          `;
          index += 1;
        } else {
          col2 += `
              <li>
                <label class="title">${data.labels[item]}:</label>
                <span class="value">${data[item]}</span>
              </li>
            `;
        }
      }
    });

    return `<div id="popover" class="hoverinfo">
        <div class="close"></div>
        <div>
          <ul style="float: right">
            ${col1}
          </ul>
          <ul style="float: left">  
            ${col2}
          </ul>
          <div style="clear: both"> </div>
        </div>
      </div>`;
  }
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
