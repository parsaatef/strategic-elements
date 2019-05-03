import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import D3 from 'd3';
import { Query } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import _ from 'underscore';
import { ELEMENT_INFORMATION } from '../../constants/routes';
import Select from '../General/Select';
import ImgButton from '../General/ImgButton';
import item4 from '../../images/menu-item-4.jpg';
import PageHeading from '../General/PageHeading';
import Datamaps from './datamaps';
import irnTopo from './irn.topo.json';
import World from '../../utils/world.json';
import Iran from '../../utils/iran.json';
import { GET_ELEMENTS_STATS } from '../../queries/elementStats';
import popupTemplate from './popupTemplate';
import { getYearOptions, getElementsGroups } from '../../utils/utility';
import ElementsSelect from './ElementsSelect';

const MapOptions = [
  { value: 'world', label: 'جهان' },
  { value: 'iran', label: 'ایران' }
];

const groupsOptions = getElementsGroups();

const yearOptions = getYearOptions(1990, 2030);

const BubblesProps = World.Countries;

const setProjection = null;

const irnBubblesProps = Iran.States;

const irnSetProjection = () => {
  const projectionD3 = D3.geo
    .mercator()
    .center([57.688, 32.4279]) // always in [East Latitude, North Longitude]
    .scale(1400);
  const pathD3 = D3.geo.path().projection(projectionD3);
  return {
    path: pathD3,
    projection: projectionD3
  };
};

class InformationOfWorld extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      scope: 'world', // irn
      locationType: 'world',
      year: 2019,
      elements: [],
      group: '',
      currentElement: {},
      elementDefault: {},
      elementSelectRefresh: ''
    };

    this.onChangeElement = this.onChangeElement.bind(this);

    this.setGroupElements = this.setGroupElements.bind(this);
  }

  onChangeElement(element) {
    this.setState({
      elements: [element.value],
      currentElement: element
    });
  }

  changeOptions(type, selectedOption) {
    this.setState({
      [type]: selectedOption.value
    });
  }

  setGroupElements(elementsObj, selectedOption) {
    const { group, elements } = this.state;

    const newElements = elementsObj.map(elem => elem.element);

    if (group && (!selectedOption || !selectedOption.value)) {
      let isEqual = true;

      if (elements.length === newElements.length) {
        elements.forEach(elem => {
          if (!newElements.includes(elem)) {
            isEqual = false;
          }
        });
      } else {
        isEqual = false;
      }

      if (!isEqual) {
        this.setState({
          elements: [...newElements],
          currentElement: {}
        });
      }
    } else if (
      !group &&
      (!selectedOption || !selectedOption.value) &&
      newElements.length > 0
    ) {
      this.setState({
        elementDefault: {
          label: elementsObj[0].elementTitle,
          value: elementsObj[0].element
        },
        elementSelectRefresh: _.uniqueId('element_refresh_')
      });
    }
  }

  render() {
    const {
      scope,
      locationType,
      year,
      elements,
      group,
      currentElement,
      elementDefault,
      elementSelectRefresh
    } = this.state;
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

    const currGroup = groupsOptions.find(grp => grp.value === group);

    const currGroupLabel = currGroup && currGroup.label ? currGroup.label : '';

    return (
      <section>
        <div className="info-select-group">
          <Row>
            <Col sm={3} xs={6}>
              <Select
                options={MapOptions}
                placeholder="انتخاب نقشه"
                onChange={this.changeOptions.bind(this, 'locationType')}
                defaultValue={locationType}
              />
            </Col>

            <Col sm={3} xs={6}>
              <Select
                options={groupsOptions}
                placeholder="انتخاب دسته"
                onChange={this.changeOptions.bind(this, 'group')}
                defaultValue={group}
              />
            </Col>

            <Col sm={3} xs={6}>
              <ElementsSelect
                group={group}
                onChangeElement={this.onChangeElement}
                setGroupElements={this.setGroupElements}
                elementDefault={elementDefault}
                elementSelectRefresh={elementSelectRefresh}
              />
            </Col>

            <Col sm={3} xs={6}>
              <Select
                options={yearOptions}
                placeholder="انتخاب سال"
                onChange={this.changeOptions.bind(this, 'year')}
                defaultValue={year}
              />
            </Col>
          </Row>
        </div>

        <PageHeading
          className="text-center animated bounce faster"
          title={
            <FormattedMessage
              id="global.map_page_heading"
              values={{
                element: currentElement.value
                  ? currentElement.label
                  : currGroupLabel
              }}
            />
          }
        />

        <Query
          query={GET_ELEMENTS_STATS}
          variables={{
            locationType,
            year,
            elements,
            offset: -1
          }}
        >
          {({ data, loading, error, refetch }) => {
            if (loading) return 'loading.....';

            console.log('data, error, refetch', data, error, refetch);
            console.log('data ::::::::::::', data);
            console.log('error ::::::::::::', error);
            console.log('refetch ::::::::::::', refetch);

            return (
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
            );
          }}
        </Query>

        {currentElement.value && (
          <ImgButton
            className="text-center btn-element-wrap"
            link={ELEMENT_INFORMATION.replace(':element', currentElement.value)}
            src={item4}
            title="نمایش اطلاعات عنصر"
          />
        )}
      </section>
    );
  }
}

export default InformationOfWorld;
