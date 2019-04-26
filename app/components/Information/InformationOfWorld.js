import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import * as d3 from 'd3';
import { INFORMATION_OF_ELEMENT } from '../../constants/routes';
import Select from '../General/Select';
import ImgButton from '../General/ImgButton';
import item4 from '../../images/menu-item-4.jpg';
import PageHeading from '../General/PageHeading';
import Datamaps from './datamaps';
import irnTopo from './irn.topo.json';
import bubblesWorld from '../../utils/world.json';
import bubblesIran from '../../utils/iran.json';

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

const BubblesProps = bubblesWorld.bubbles;

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
const setProjection = null;

const irnBubblesProps = bubblesIran.bubbles;

const irnSetProjection = () => {
  const projectionD3 = d3.geo
    .mercator()
    .center([57.688, 32.4279]) // always in [East Latitude, North Longitude]
    .scale(1400);
  const pathD3 = d3.geo.path().projection(projectionD3);
  return {
    path: pathD3,
    projection: projectionD3
  };
};

export default class InformationOfWorld extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      scope: 'irn'
    };
  }

  render() {
    const { scope } = this.state;
    let idName = 'world-map';
    let widthProps = '80%';
    let heightProps = '65vh';
    let dataUrlProps = null;
    let bubblesProps = BubblesProps;
    let popupTemplateProps = popupTemplate;
    let setProjectionProps = setProjection;

    if (scope === 'irn') {
      idName = 'iran-map';
      widthProps = '85%';
      heightProps = '65vh';
      dataUrlProps = irnTopo;
      bubblesProps = irnBubblesProps;
      popupTemplateProps = popupTemplate;
      setProjectionProps = irnSetProjection;
    }

    return (
      <div>
        <div className="info-select-group">
          <Row>
            <Col sm={3} xs={6}>
              <Select options={MapOptions} placeholder="انتخاب نقشه" />
            </Col>

            <Col sm={3} xs={6}>
              <Select options={GroupOptions} placeholder="انتخاب دسته" />
            </Col>

            <Col sm={3} xs={6}>
              <Select options={ElementOptions} placeholder="انتخاب عنصر" />
            </Col>

            <Col sm={3} xs={6}>
              <Select options={YearOptions} placeholder="انتخاب سال" />
            </Col>
          </Row>
        </div>

        <PageHeading
          className="text-center animated bounce faster"
          title="نقشه منابع و ذخایر طلا در جهان"
        />

        <Datamaps
          className="smfp-datamaps-wrap"
          idName={idName}
          widthProps={widthProps}
          heightProps={heightProps}
          scopeProps={scope}
          dataUrlProps={dataUrlProps}
          bubblesProps={bubblesProps}
          popupTemplateProps={popupTemplateProps}
          setProjectionProps={setProjectionProps}
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
