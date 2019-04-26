const popupTemplate = {
  popupTemplate: (geo, data) =>
    `<div id="popover" class="hoverinfo">
      <div class="close"></div>
      <ul>
        <li>
          <label class="country" id="country">کشور: </label>
          <span class="" id="country-value">${data.name}</span>
        </li>

        <li>
          <label class="Rating" id="Rating">رتبه: </label>
          <span class="" id="Rating-value">33</span>
        </li>

        <li>
          <label class="GDP" id="GDP"> GDP: </label>
          <span class="" id="GDP-value">33</span>
        </li>

        <li>
          <label class="turnover" id="turnover"> turnover: </label>
          <span class="" id="turnover-value">33</span>
        </li>
      </ul>
    </div>`
};

export default popupTemplate;
