import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Query } from 'react-apollo';
import { injectIntl, intlShape } from 'react-intl';
import IconButton from '../General/IconButton';
import Loading from '../General/Loading';
import {
  SECONDARY_SOURCE,
  UPSTREAM_INDUSTRY,
  ENVIRONMENT,
  THREAT,
  TECHNOLOGICAL_LEVEL,
  DEPENDENCE_INDUSTRIES,
  MINE,
  MINERAL,
  GLOBAL_PRICE,
  PRODUCTION
} from '../../constants/routes';
import ElementDetailItem from './ElementDetailItem';
import { GET_ELEMENT_MIX_STATS } from '../../queries/elementStats';
import {
  getYearOptions,
  getCountries,
  getStates,
  getQualityLevel
} from '../../utils/utility';
import Select from '../General/Select';
import { getPercentValue } from '../Information/MapInfo';
import PageHeadingIcon from '../General/PageHeadingIcon';

const yearOptions = getYearOptions(1990, 2030);

const countryOptions = getCountries();

const statesOptions = getStates();

class ElementDetailForWorld extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      year: 2018,
      location: 'all'
    };
  }

  changeOptions(type, selectedOption) {
    this.setState({
      [type]: selectedOption.value
    });
  }

  render() {
    const { match, intl } = this.props;

    const { element, type, title } = match.params;

    const { formatNumber } = intl;

    const { year, location } = this.state;

    const locationOptions = type === 'world' ? countryOptions : statesOptions;

    // const locationOption = locationOptions.find(option => option.value === location);

    // const locationLabel = locationOption ? locationOption.label : "جهان";

    const locationLabel = type === 'world' ? 'جهان' : 'ایران';

    let heading = `جزییات آمار ماده معدنی {{element}} در {{location}}`;

    heading = heading
      .replace('{{location}}', locationLabel)
      .replace('{{element}}', title);

    return (
      <div>
        <PageHeadingIcon icon="smfpIcon smfpIcon-details" title={heading} />

        <div className="filters">
          <Row>
            <Col sm={3} xs={6} className="animated flipInX faster" />

            <Col
              sm={3}
              xs={6}
              className="animated flipInX animation-fill-mode-backwards fast"
            >
              <Select
                options={yearOptions}
                placeholder="انتخاب سال"
                onChange={this.changeOptions.bind(this, 'year')}
                defaultValue={year}
              />
            </Col>

            <Col
              sm={3}
              xs={6}
              className="animated animation-fill-mode-backwards flipInX fast"
            >
              <Select
                options={locationOptions}
                placeholder={type === 'world' ? 'انتخاب کشور' : 'انتخاب استان'}
                onChange={this.changeOptions.bind(this, 'location')}
                defaultValue={location}
              />
            </Col>

            <Col sm={3} xs={6} className="animated flipInX fast" />
          </Row>
        </div>

        <Query
          query={GET_ELEMENT_MIX_STATS}
          variables={{
            // locationType: type,
            locations: [location, 'all', 'IRN'],
            year,
            elements: [element]
          }}
        >
          {({ data, loading, error, refetch }) => {
            if (loading) return <Loading />;

            console.log('data, error, refetch', data, error, refetch);

            if (data && data.statsByElements) {
              const totalItemData = data.statsByElements.find(
                stats => stats.location === 'all'
              );

              const iranItemData = data.statsByElements.find(
                stats => stats.location === 'IRN'
              );
              // console.log("-----location-----", location);
              const currLocStats = data.statsByElements.find(
                stats => stats.location === location
              );

              const {
                productionValue: iranProductionValue,
                consumptionValue: iranConsumptionValue,
                unit: iranUnit
              } = iranItemData || {};
              console.log(iranProductionValue, iranConsumptionValue, iranUnit);

              const {
                productionValue: productionValueTotal,
                secondaryProductionValue: secondaryProductionTotal,
                resourceStats: resourceStatsTotal,
                consumptionValue: consumptionValueTotal,
                exportValue: exportValueTotal,
                importValue: importValueTotal,
                unit: unitTotal
              } = totalItemData || {};

              const {
                primarySource: primarySourceTotal,
                unit: unitSourceTotal
              } = resourceStatsTotal || {};

              const {
                price,
                resourceStats,
                productionValue,
                exportValue,
                importValue,
                secondaryProductionValue,
                unit
              } = currLocStats || {}; // console.log("-----currLocStats-----", currLocStats);

              const { primarySource, unit: unitSource, secondarySource } =
                resourceStats || {};

              const { price: globalPrice, unit: unitPrice } = price || {};

              const allFactor = {
                primaryProductionPercent: getPercentValue(
                  productionValue,
                  productionValueTotal,
                  unit,
                  unitTotal,
                  formatNumber
                ),
                secondaryProductionPercent: getPercentValue(
                  secondaryProductionValue,
                  secondaryProductionTotal,
                  unit,
                  unitTotal,
                  formatNumber
                ),

                resourcePercent: getPercentValue(
                  primarySource,
                  primarySourceTotal,
                  unitSource,
                  unitSourceTotal,
                  formatNumber
                ),

                iranConsumptionPercent: getPercentValue(
                  iranConsumptionValue,
                  consumptionValueTotal,
                  iranUnit,
                  unitTotal,
                  formatNumber
                ),
                exportPercent: getPercentValue(
                  exportValue,
                  exportValueTotal,
                  unit,
                  unitTotal,
                  formatNumber
                ),
                importPercent: getPercentValue(
                  importValue,
                  importValueTotal,
                  unit,
                  unitTotal,
                  formatNumber
                )
              };

              return (
                <div className="main-detail-line">
                  <ElementDetailItem
                    value={`${formatNumber(globalPrice)} دلار `}
                    unit={unitPrice}
                    name="قیمت جهانی"
                  />

                  <ElementDetailItem
                    value={formatNumber(productionValue)}
                    unit={unit}
                    name="میزان تولید اولیه"
                  />

                  {location !== "all" && <ElementDetailItem
                    value={allFactor.primaryProductionPercent}
                    unit=""
                    name="درصد تولید اولیه"
                  />}

                  <ElementDetailItem
                    value={formatNumber(secondaryProductionValue)}
                    unit={unit}
                    name="میزان تولید ثانویه"
                  />

                  {location !== "all" && <ElementDetailItem
                    value={allFactor.secondaryProductionPercent}
                    unit=""
                    name="درصد تولید ثانویه"
                  />}

                  <ElementDetailItem
                    value={location !== "IRN" ? formatNumber(exportValue) : exportValueTotal}
                    unit={unit}
                    name="میزان صادرات از ایران"
                  />

                  {location !== "all" && location !== "IRN" && <ElementDetailItem
                    value={allFactor.exportPercent}
                    unit=""
                    name="درصد صادرات از ایران"
                  />}

                  <ElementDetailItem
                    value={location !== "IRN" ? formatNumber(importValue) : importValueTotal}
                    unit={unit}
                    name="میزان واردات به ایران"
                  />

                  {location !== "all" && location !== "IRN" && <ElementDetailItem
                    value={allFactor.importPercent}
                    unit=""
                    name="درصد واردات به ایران"
                  />}

                  <ElementDetailItem
                    value={formatNumber(consumptionValueTotal)}
                    unit={unit}
                    name="میزان مصرف جهان"
                  />

                  <ElementDetailItem
                    value={formatNumber(iranConsumptionValue)}
                    unit={iranUnit}
                    name="میزان مصرف ایران"
                  />

                  <ElementDetailItem
                    value={allFactor.iranConsumptionPercent}
                    unit=""
                    name="درصد مصرف ایران"
                  />

                  <ElementDetailItem
                    value={formatNumber(primarySource)}
                    unit={unitSource}
                    name="میزان منابع اولیه"
                  />

                  {location !== "all" && <ElementDetailItem
                    value={allFactor.resourcePercent}
                    unit=""
                    name="درصد منابع اولیه"
                  />}

                  <ElementDetailItem
                    value={getQualityLevel('option', secondarySource)}
                    unit=""
                    name="میزان منابع ثانویه"
                  />
                </div>
              );
            }

            return null;
          }}
        </Query>

        <Row>
          <Col sm={4} className="animated flipInX fast animation-auto-delay">
            <IconButton
              className="main-detail-btn-wrap text-center"
              link={GLOBAL_PRICE.replace(':element', element).replace(
                ':title',
                title
              )}
              icon="smfpIcon smfpIcon-global-price"
              title="روند قیمت جهانی"
            />
          </Col>

          <Col sm={4} className="animated flipInX fast animation-auto-delay">
            <IconButton
              className="main-detail-btn-wrap text-center"
              link={PRODUCTION.replace(':element', element).replace(
                ':title',
                title
              )}
              icon="smfpIcon smfpIcon-global-price"
              title="روند تولید"
            />
          </Col>

          <Col sm={4} className="animated flipInX fast animation-auto-delay">
            <IconButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE.replace(':element', element).replace(
                ':title',
                title
              )}
              icon="smfpIcon smfpIcon-secondary-sources"
              title="منابع ثانویه"
            />
          </Col>

          <Col sm={4} className="animated flipInX fast animation-auto-delay">
            <IconButton
              className="main-detail-btn-wrap text-center"
              link={UPSTREAM_INDUSTRY.replace(':element', element).replace(
                ':title',
                title
              )}
              icon="smfpIcon smfpIcon-upstream-industry"
              title="صنایع پایین دستی"
            />
          </Col>

          <Col sm={4} className="animated flipInX fast animation-auto-delay">
            <IconButton
              className="main-detail-btn-wrap text-center"
              link={ENVIRONMENT.replace(':element', element).replace(
                ':title',
                title
              )}
              icon="smfpIcon smfpIcon-environment"
              title="محیط زیستی"
            />
          </Col>

          <Col sm={4} className="animated flipInX fast animation-auto-delay">
            <IconButton
              className="main-detail-btn-wrap text-center"
              link={MINE.replace(':element', element).replace(':title', title)}
              icon="smfpIcon smfpIcon-mine"
              title="فهرست معادن"
            />
          </Col>

          <Col sm={4} className="animated flipInX fast animation-auto-delay">
            <IconButton
              className="main-detail-btn-wrap text-center"
              link={DEPENDENCE_INDUSTRIES.replace(':element', element).replace(
                ':title',
                title
              )}
              icon="smfpIcon smfpIcon-dependence-industries"
              title="صنایع وابسته"
            />
          </Col>

          <Col sm={4} className="animated flipInX fast animation-auto-delay">
            <IconButton
              className="main-detail-btn-wrap text-center"
              link={TECHNOLOGICAL_LEVEL.replace(':element', element).replace(
                ':title',
                title
              )}
              icon="smfpIcon smfpIcon-technological-level"
              title="سطح تکنولوژی"
            />
          </Col>

          <Col sm={4} className="animated flipInX fast animation-auto-delay">
            <IconButton
              className="main-detail-btn-wrap text-center"
              link={MINERAL.replace(':element', element).replace(
                ':title',
                title
              )}
              icon="smfpIcon smfpIcon-mineral"
              title="فهرست کانی ها"
            />
          </Col>

          <Col sm={4} className="animated flipInX fast animation-auto-delay">
            <IconButton
              className="main-detail-btn-wrap text-center"
              link={THREAT.replace(':element', element).replace(
                ':title',
                title
              )}
              icon="smfpIcon smfpIcon-threats"
              title="تهدیدها"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

ElementDetailForWorld.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(ElementDetailForWorld);
