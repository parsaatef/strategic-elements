const popupTemplate = {
  popupTemplate: (geo, data) =>
    `<div id="popover" class="hoverinfo">
      <div class="close"></div>
      <ul>
        <li>
          <label class="title">title:</label>
          <span class="value">${data.title}</span>
        </li>
        <li>
          <label class="title">resourceValue:</label>
          <span class="value">${data.resourceValue}</span>
        </li>
        <li>
          <label class="title">productionValue:</label>
          <span class="value">${data.productionValue}</span>
        </li>
        <li>
          <label class="title">consumptionValue:</label>
          <span class="value">${data.consumptionValue}</span>
        </li>
      </ul>
    </div>`
};

export default popupTemplate;
