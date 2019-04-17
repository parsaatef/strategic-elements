import React, { Component } from 'react';
import Datamap from 'datamaps';
import { INFORMATION_OF_ELEMENT } from '../../constants/routes';
import Select from '../General/Select';
import ImgButton from '../General/ImgButton';
import item4 from '../../images/menu-item-4.jpg';

const MapOptions = [
  { value: 'map', label: 'انتخاب نقشه' },
  { value: 'world', label: 'جهان' },
  { value: 'iran', label: 'ایران' }
];
const GroupOptions = [
  { value: 'Group0', label: 'انتخاب دسته' },
  { value: 'Group1', label: 'فلزات پایه' },
  { value: 'Group2', label: 'فلزات گرانبها' },
  { value: 'Group3', label: 'عناصر نادر خاکی' }
];
const ElementOptions = [
  { value: 'element', label: 'انتخاب عنصر' },
  { value: 'Zinc', label: 'Zinc' },
  { value: 'Gallium', label: 'Gallium' },
  { value: 'Germanium', label: 'Germanium' },
  { value: 'Selenium', label: 'Selenium' }
];
const YearOptions = [
  { value: 'year', label: 'انتخاب سال' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' }
];

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
      <div className="smfp-main-container-inner">
        <div className="info-select-group">
          <div className="row">
            <div className="col-sm-3 col-xs-6">
              <Select options={MapOptions} placeholder="انتخاب نقشه" />
            </div>

            <div className="col-sm-3 col-xs-6">
              <Select options={GroupOptions} placeholder="انتخاب دسته" />
            </div>

            <div className="col-sm-3 col-xs-6">
              <Select options={ElementOptions} placeholder="انتخاب عنصر" />
            </div>

            <div className="col-sm-3 col-xs-6">
              <Select options={YearOptions} placeholder="انتخاب سال" />
            </div>
          </div>
        </div>

        <div className="text-center animated bounce faster">
          <h4>نقشه منابع و ذخایر طلا در جهان</h4>
        </div>

        <div
          id="world-map"
          className="smfp-datamaps-wrap"
          style={{ width: '80%', height: '65vh' }}
        />

        <ImgButton
          className="text-center btn-element-wrap"
          link={INFORMATION_OF_ELEMENT}
          src={item4}
          title="نمایش اطلاعات عنصر"
        />
      </div>
    );
  }
}
