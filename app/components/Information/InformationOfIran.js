import React, { Component } from 'react';

export default class InformationOfIran extends Component<Props> {
  render() {
    return (
      <div>
        <div className="info-select-group">
          <div className="row">
            <div className="col-sm-3 col-xs-6">
              <select className="smfp-select2" name="maplist" form="maplist">
                <option value="map">انتخاب نقشه</option>
                <option value="world">جهان</option>
                <option value="iran">ایران</option>
              </select>
            </div>

            <div className="col-sm-3 col-xs-6">
              <select
                className="smfp-select2"
                name="Grouplist"
                form="Grouplist"
              >
                <option value="Group">انتخاب دسته</option>
                <option value="Group1">فلزات پایه</option>
                <option value="Group2">فلزات گرانبها</option>
                <option value="Group3">عناصر نادر خاکی</option>
              </select>
            </div>

            <div className="col-sm-3 col-xs-6">
              <select
                className="smfp-select2"
                name="elementlist"
                form="elementlist"
              >
                <option value="element">انتخاب عنصر</option>
                <option value="Zinc">Zinc</option>
                <option value="Gallium">Gallium</option>
                <option value="Germanium">Germanium</option>
                <option value="Selenium">Selenium</option>
              </select>
            </div>

            <div className="col-sm-3 col-xs-6">
              <select className="smfp-select2" name="yearlist" form="yearform">
                <option value="year">سال</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
              </select>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h4>نقشه منابع و ذخایر طلا در ایران</h4>
        </div>
        <div id="iran-map" />
        <div className="text-center btn-element-wrap">
          <a className="smfp-btn-img" href="">
            <img src="../../images/menu-item-4.jpg" alt="img" className="" />
            <div className="title">نمایش اطلاعات عنصر</div>
          </a>
        </div>
      </div>
    );
  }
}
