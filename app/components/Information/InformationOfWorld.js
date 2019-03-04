import React, { Component } from 'react';
import Datamap from 'datamaps';
import Menu from '../Menu/Menu';
//  import $ from 'jquery';
//  import select2 from 'select2';
import item4 from '../../images/menu-item-4.jpg';
import 'select2/dist/css/select2.min.css';

export default class InformationOfWorld extends Component<Props> {
  componentDidMount() {
    const myMapTest = new Datamap({
      element: document.getElementById('world-map'),
      scope: 'world', //  currently supports 'usa' and 'world', however with custom map data you can specify your own
      //  setProjection: setProjection, // returns a d3 path and projection functions
      projection: 'mercator', //  style of projection to be used. try "mercator"
      height: null, // if not null, datamaps will grab the height of 'element'
      width: null, // if not null, datamaps will grab the width of 'element'
      responsive: false, // if true, call `resize()` on the map object when it should adjust it's size
      done: () => {}, // callback when the map is done drawing
      fills: {
        Default: '#a4d05b',
        defaultFill: 'rgba(127, 154, 84, 0.5)' // the keys in this object map to the "fillKey" of [data] or [bubbles]
      },
      dataType: 'json', // for use with dataUrl, currently 'json' or 'csv'. CSV should have an `id` column
      dataUrl: null, // if not null, datamaps will attempt to fetch this based on dataType ( default: json )
      geographyConfig: {
        dataUrl: null, // if not null, datamaps will fetch the map JSON (currently only supports topojson)
        hideAntarctica: true,
        borderWidth: 1,
        borderOpacity: 1,
        borderColor: 'transparent',
        // popupTemplate: function(geography, data) { // this function should just return a string
        //   return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
        // },
        popupOnHover: false, // disable the popup while hovering
        highlightOnHover: false,
        highlightFillColor: 'rgba(127, 154, 84, 0.8)',
        highlightBorderColor: 'transparent',
        highlightBorderWidth: 2,
        highlightBorderOpacity: 1
      },
      bubblesConfig: {
        borderWidth: 2,
        borderOpacity: 1,
        borderColor: 'rgba(255,255,255, .4)',
        popupOnHover: true,
        radius: null,
        /* popupTemplate: function(geography, data) {
          return '<div class="hoverinfo"><strong>' + data.name + '</strong></div>';
        }, */
        fillOpacity: 0.75,
        animate: true,
        highlightOnHover: true,
        highlightFillColor: '#a4d05b',
        highlightBorderColor: 'transparent',
        highlightBorderWidth: 2,
        highlightBorderOpacity: 1,
        highlightFillOpacity: 0.85,
        exitDelay: 100,
        key: JSON.stringify
      },
      arcConfig: {
        strokeColor: '#DD1C77',
        strokeWidth: 1,
        arcSharpness: 1,
        animationSpeed: 600
      }
    });

    myMapTest.bubbles(
      [
        {
          name: 'Not a bomb, but centered on Brazil',
          radius: 8,
          centered: 'BRA',
          country: 'USA',
          yeild: 0,
          fillKey: 'Default',
          date: '1954-03-01'
        },
        {
          name: 'Not a bomb',
          radius: 5,
          yeild: 0,
          country: 'USA',
          centered: 'USA',
          date: '1986-06-05',
          significance: 'Centered on US',
          fillKey: 'Default'
        },
        {
          name: 'Castle Bravo',
          radius: 7,
          yeild: 15000,
          country: 'USA',
          significance:
            'First dry fusion fuel "staged" thermonuclear weapon; a serious nuclear fallout accident occurred',
          fillKey: 'Default',
          date: '1954-03-01',
          latitude: 11.415,
          longitude: 165.1619
        },
        {
          name: 'Tsar Bomba',
          radius: 18,
          yeild: 50000,
          country: 'USSR',
          fillKey: 'Default',
          significance:
            'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
          date: '1961-10-31',
          latitude: 73.482,
          longitude: 54.5854
        }
      ],
      {
        popupTemplate: (geo, data) =>
          `<div id="popover" class="hoverinfo">
            <div class="close"></div>
            <ul>

              <li>
                <label class="country" id="country">کشور: </label>
                <span class="" id="country-value">${data.country} </span>
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
      }
    );

    /* $('.smfp-select2').select2({
      dir: "rtl"
    }); */
  }

  render() {
    return (
      <div className="container">
        <div className="smfp-main-page">
          <div className="row">
            <div className="col-sm-3">
              <Menu />
            </div>

            <div className="col-sm-9">
              <div className="smfp-main-container smfp-Custom-scrollbar-container">
                <div className="smfp-main-container-inner">
                  <div className="info-select-group">
                    <div className="row">
                      <div className="col-sm-3 col-xs-6">
                        <select
                          className="smfp-select2"
                          name="maplist"
                          form="maplist"
                        >
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
                        <select
                          className="smfp-select2"
                          name="yearlist"
                          form="yearform"
                        >
                          <option value="year">سال</option>
                          <option value="2018">2018</option>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                          <option value="2015">2015</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="text-center animated bounce faster">
                    <h4>نقشه منابع و ذخایر طلا در جهان</h4>
                  </div>

                  <div
                    id="world-map"
                    style={{ height: '65vh', padding: '30px 0' }}
                  />

                  <div className="text-center btn-element-wrap">
                    <a className="smfp-btn-img" href="">
                      <img src={item4} alt="img" />
                      <div className="title">نمایش اطلاعات عنصر</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
