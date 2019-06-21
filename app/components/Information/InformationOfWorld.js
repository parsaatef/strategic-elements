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
import { GET_ELEMENT_MIX_STATS } from '../../queries/elementStats'; // GET_ELEMENTS_STATS,
import popupTemplate from './popupTemplate';
import { getYearOptions, getElementsCategory } from '../../utils/utility';
import ElementsSelect from './ElementsSelect';

// window.d3 = d3;

/* const MapOptions = [
  { value: 'world', label: 'جهان' },
  { value: 'iran', label: 'ایران' }
]; */

const typeOptions = [
  { value: 'product', label: 'تولید' },
  { value: 'source', label: 'منابع' },
  { value: 'export', label: 'صادرات' },
  { value: 'import', label: 'واردات' }
];

const groupsOptions = getElementsCategory();

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
      /**
       * TODO: remove hard code and calculate 1 year ago from now
       */
      year: 2018,
      elements: ['gold'],
      group: '',
      currentElement: {
        value: 'gold',
        label: 'طلا'
      },
      elementDefault: {
        value: 'gold',
        label: 'طلا'
      },
      elementSelectRefresh: '',
      type: 'product'
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

  getBubbleProps(data) {
    const { locationType } = this.state;

    const { intl } = this.props;

    let LocationOptions = CountriesOptions;
    let LocationsType = 'country';

    if (locationType === 'iran') {
      LocationOptions = StatesOptions;
      LocationsType = 'state';
    }

    const { formatMessage, formatNumber } = intl;

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
        Math.round(((elem.productionValue - minValue) / subValue) * 10) + 5;

      if (!radiusOfLocation) {
        radiusOfLocation = 5;
      }

      let locations;

      if (LocationsType === 'country') {
        locations = LocationOptions.find(
          cnty => cnty.country === elem.location
        );
      } else {
        locations = LocationOptions.find(stt => stt.state === elem.location);
      }

      if (locations) {
        let prevCountry;
        if (LocationsType === 'country') {
          prevCountry = LocationProps.find(
            cnty => cnty.country === elem.location
          );
        } else {
          prevCountry = LocationProps.find(stt => stt.state === elem.location);
        }

        if (!prevCountry) {
          LocationProps.push({
            ...locations,
            title: formatMessage({ id: locations.title }),
            resourceValue: elem.resourceValue
              ? formatNumber(elem.resourceValue)
              : '-',
            productionValue: elem.productionValue
              ? formatNumber(elem.productionValue)
              : '-',
            consumptionValue: elem.consumptionValue
              ? formatNumber(elem.consumptionValue)
              : '-',
            exportValue: elem.exportValue
              ? formatNumber(elem.exportValue)
              : '-',
            importValue: elem.importValue
              ? formatNumber(elem.importValue)
              : '-',
            secondaryProductionValue: elem.secondaryProductionValue
              ? formatNumber(elem.secondaryProductionValue)
              : '-',
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
            consumptionValue: consumptionValue + elem.consumptionValue,
            exportValue: exportValue + elem.exportValue,
            importValue: importValue + elem.importValue,
            secondaryProductionValue:
              secondaryProductionValue + elem.secondaryProductionValue,
            // mineCount: mineCount + elem.mineCount,
            radius: radius - 5 + radiusOfLocation
          };
        }
      }
    });
  }

  render() {
    const {
      locationType,
      year,
      elements,
      group,
      currentElement,
      elementDefault,
      elementSelectRefresh,
      type
    } = this.state;

    let scopeProps = 'world';
    let idName = 'world-map';
    let widthProps = '80%';
    let heightProps = '65vh';
    let dataUrlProps = null;
    let popupTemplateProps = popupTemplate;
    let setProjectionProps = setProjection;

    if (locationType === 'iran') {
      scopeProps = 'irn';
      idName = 'iran-map';
      widthProps = '85%';
      heightProps = '65vh';
      dataUrlProps = 'components/Information/irn.topo.json';
      popupTemplateProps = popupTemplate;
      setProjectionProps = irnSetProjection;
    }

    const currGroup = groupsOptions.find(grp => grp.value === group);

    const currGroupLabel = currGroup && currGroup.label ? currGroup.label : '';

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
              {/* <Select
                options={MapOptions}
                placeholder="انتخاب نقشه"
                onChange={this.changeOptions.bind(this, 'locationType')}
                defaultValue={locationType}
              /> */}

              <Select
                options={typeOptions}
                placeholder="انتخاب نوع"
                onChange={this.changeOptions.bind(this, 'type')}
                defaultValue={type}
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
            query={GET_ELEMENT_MIX_STATS} // GET_ELEMENTS_STATS}
            variables={{
              // locationType,
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
