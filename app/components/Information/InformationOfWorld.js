import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import * as d3 from 'd3';
import { Query } from 'react-apollo';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import _ from 'underscore';
import { ELEMENT_INFORMATION } from '../../constants/routes';
import Select from '../General/Select';
import IconButton from '../General/IconButton';
import PageHeadingIcon from '../General/PageHeadingIcon';
import Loading from '../General/Loading';
import Datamaps from './datamaps';
import World from '../../utils/world.json';
import Iran from '../../utils/iran.json';
import { GET_ELEMENTS_STATS } from '../../queries/elementStats';
import popupTemplate from './popupTemplate';
import { getYearOptions, getElementsGroups } from '../../utils/utility';
import ElementsSelect from './ElementsSelect';

// window.d3 = d3;

const MapOptions = [
  { value: 'world', label: 'جهان' },
  { value: 'iran', label: 'ایران' }
];

const groupsOptions = getElementsGroups();

const yearOptions = getYearOptions(1990, 2030);

const CountriesOptions = World.Countries;

const setProjection = null;

const StatesOptions = Iran.States;

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

class InformationOfWorld extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
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
      locationType,
      year,
      elements,
      group,
      currentElement,
      elementDefault,
      elementSelectRefresh
    } = this.state;

    let scopeProps = 'world';
    let idName = 'world-map';
    let widthProps = '80%';
    let heightProps = '65vh';
    let dataUrlProps = null;
    let LocationOptions = CountriesOptions;
    let LocationsType = 'country';
    let popupTemplateProps = popupTemplate;
    let setProjectionProps = setProjection;

    if (locationType === 'iran') {
      scopeProps = 'irn';
      idName = 'iran-map';
      widthProps = '85%';
      heightProps = '65vh';
      dataUrlProps = 'components/Information/irn.topo.json';
      LocationOptions = StatesOptions;
      LocationsType = 'state';
      popupTemplateProps = popupTemplate;
      setProjectionProps = irnSetProjection;
    }

    const currGroup = groupsOptions.find(grp => grp.value === group);

    const currGroupLabel = currGroup && currGroup.label ? currGroup.label : '';

    const { intl } = this.props;

    const { formatMessage } = intl;

    return (
      <section>
        <div className="info-select-group">
          <PageHeadingIcon
            icon="smfpIcon smfpIcon-illustrated-information"
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

          <Row>
            <Col
              sm={3}
              xs={6}
              className="animated flipInX fast animation-fill-mode-backwards"
            >
              <Select
                options={MapOptions}
                placeholder="انتخاب نقشه"
                onChange={this.changeOptions.bind(this, 'locationType')}
                defaultValue={locationType}
              />
            </Col>

            <Col
              sm={3}
              xs={6}
              className="animated flipInX fast delay-0-5s animation-fill-mode-backwards"
            >
              <Select
                options={groupsOptions}
                placeholder="انتخاب دسته"
                onChange={this.changeOptions.bind(this, 'group')}
                defaultValue={group}
              />
            </Col>

            <Col
              sm={3}
              xs={6}
              className="animated flipInX fast delay-1s animation-fill-mode-backwards"
            >
              <ElementsSelect
                group={group}
                onChangeElement={this.onChangeElement}
                setGroupElements={this.setGroupElements}
                elementDefault={elementDefault}
                elementSelectRefresh={elementSelectRefresh}
              />
            </Col>

            <Col
              sm={3}
              xs={6}
              className="animated flipInX fast delay-1-5s animation-fill-mode-backwards"
            >
              <Select
                options={yearOptions}
                placeholder="انتخاب سال"
                onChange={this.changeOptions.bind(this, 'year')}
                defaultValue={year}
              />
            </Col>
          </Row>
        </div>

        <div className="smfp-datamaps-wrap-outer animated fadeInUp fast delay-2s">
          <Query
            query={GET_ELEMENTS_STATS}
            variables={{
              locationType,
              year,
              elements
            }}
          >
            {({ data, loading }) => {
              if (loading) return <Loading />;
              if (
                !data ||
                !data.searchElementStats ||
                !data.searchElementStats.elementsStats
              )
                return null;
              const LocationProps = [];

              const labels = {
                title: formatMessage({ id: 'global.title' }),
                resourceValue: formatMessage({
                  id: 'global.resourceValue'
                }),
                productionValue: formatMessage({
                  id: 'global.productionValue'
                }),
                consumptionValue: formatMessage({
                  id: 'global.consumptionValue'
                }),
                exportValue: formatMessage({ id: 'global.exportValue' }),
                importValue: formatMessage({ id: 'global.importValue' }),
                secondaryProductionValue: formatMessage({
                  id: 'global.secondaryProductionValue'
                })
                // mineCount: formatMessage({ id: 'global.mineCount' })
              };

              let maxValue = 0;
              let minValue = 100000000;

              data.searchElementStats.elementsStats.forEach(elem => {
                if (elem.productionValue < minValue) {
                  minValue = elem.productionValue;
                }
                if (elem.productionValue > maxValue) {
                  maxValue = elem.productionValue;
                }
              });

              const subValue = maxValue - minValue;

              data.searchElementStats.elementsStats.forEach(elem => {
                let radiusOfLocation =
                  Math.round(
                    ((elem.productionValue - minValue) / subValue) * 10
                  ) + 5;

                if (!radiusOfLocation) {
                  radiusOfLocation = 5;
                }

                let locations;

                if (LocationsType === 'country') {
                  locations = LocationOptions.find(
                    cnty => cnty.country === elem.location
                  );
                } else {
                  locations = LocationOptions.find(
                    stt => stt.state === elem.location
                  );
                }

                if (locations) {
                  let prevCountry;
                  if (LocationsType === 'country') {
                    prevCountry = LocationProps.find(
                      cnty => cnty.country === elem.location
                    );
                  } else {
                    prevCountry = LocationProps.find(
                      stt => stt.state === elem.location
                    );
                  }

                  if (!prevCountry) {
                    LocationProps.push({
                      ...locations,
                      title: formatMessage({ id: locations.title }),
                      resourceValue: elem.resourceValue,
                      productionValue: elem.productionValue,
                      consumptionValue: elem.consumptionValue,
                      exportValue: elem.exportValue,
                      importValue: elem.importValue,
                      secondaryProductionValue: elem.secondaryProductionValue,
                      // mineCount: elem.mineCount,
                      radius: radiusOfLocation,
                      labels
                    });
                  } else {
                    let prevCountryIndex;
                    if (LocationsType === 'country') {
                      prevCountryIndex = LocationProps.findIndex(
                        cnty => cnty.country === elem.location
                      );
                    } else {
                      prevCountryIndex = LocationProps.findIndex(
                        stt => stt.state === elem.location
                      );
                    }

                    const {
                      resourceValue,
                      productionValue,
                      consumptionValue,
                      exportValue,
                      importValue,
                      secondaryProductionValue,
                      // mineCount,
                      radius
                    } = prevCountry;

                    // .
                    LocationProps[prevCountryIndex] = {
                      ...prevCountry,
                      resourceValue: resourceValue + elem.resourceValue,
                      productionValue: productionValue + elem.productionValue,
                      consumptionValue:
                        consumptionValue + elem.consumptionValue,
                      exportValue: exportValue + elem.exportValue,
                      importValue: importValue + elem.importValue,
                      secondaryProductionValue:
                        secondaryProductionValue +
                        elem.secondaryProductionValue,
                      // mineCount: mineCount + elem.mineCount,
                      radius: radius - 5 + radiusOfLocation
                    };
                  }
                }
              });

              return (
                <Datamaps
                  className="smfp-datamaps-wrap animated fadeIn fast"
                  idName={idName}
                  widthProps={widthProps}
                  heightProps={heightProps}
                  scopeProps={scopeProps}
                  dataUrlProps={dataUrlProps}
                  bubblesProps={LocationProps}
                  popupTemplateProps={popupTemplateProps}
                  setProjectionProps={setProjectionProps}
                />
              );
            }}
          </Query>
        </div>

        {currentElement.value && (
          <IconButton
            className="text-center btn-element-wrap animated fadeInUp fast"
            link={ELEMENT_INFORMATION.replace(':element', currentElement.value)}
            icon="smfpIcon smfpIcon-element"
            title="نمایش اطلاعات عنصر"
          />
        )}
      </section>
    );
  }
}

InformationOfWorld.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(InformationOfWorld);
