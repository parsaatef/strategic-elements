import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Query } from 'react-apollo';
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
import { GET_ELEMENTS_STATS } from '../../queries/elementStats';
import { getYearOptions, getCountries, getStates } from '../../utils/utility';
import Select from '../General/Select';
import PageHeadingIcon from '../General/PageHeadingIcon';

const yearOptions = getYearOptions(1990, 2030);

const countryOptions = getCountries();

const statesOptions = getStates();

export default class ElementDetailForWorld extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      year: 2002,
      location: ''
    };
  }

  changeOptions(type, selectedOption) {
    this.setState({
      [type]: selectedOption.value
    });
  }

  render() {
    const { match } = this.props;

    const { element, type, title } = match.params;

    const { year, location } = this.state;

    const locationOptions = type === 'world' ? countryOptions : statesOptions;

    // const locationOption = locationOptions.find(option => option.value === location);

    // const locationLabel = locationOption ? locationOption.label : "جهان";

    const locationLabel = type === 'world' ? 'جهان' : 'ایران';

    let heading = `جزییات منابع و ذخایر {{element}} در {{location}}`;

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
          query={GET_ELEMENTS_STATS}
          variables={{
            locationType: type,
            location,
            year,
            elements: [element]
          }}
        >
          {({ data, loading, error, refetch }) => {
            if (loading) return <Loading />;

            console.log('data, error, refetch', data, error, refetch);

            if (
              data &&
              data.searchElementStats &&
              data.searchElementStats.elementsStats &&
              data.searchElementStats.elementsStats.length === 1
            ) {
              const stats = data.searchElementStats.elementsStats[0];

              const {
                resourceValue,
                productionValue,
                consumptionValue,
                // mineCount,
                exportValue,
                importValue,
                secondaryProductionValue
              } = stats;

              return (
                <div className="main-detail-line">
                  <ElementDetailItem value={resourceValue} name="میزان منابع" />

                  <ElementDetailItem
                    value={productionValue}
                    name="مجموع تولید سالانه"
                  />

                  <ElementDetailItem
                    value={consumptionValue}
                    name="مجموع مصرف سالانه"
                  />

                  {/* <ElementDetailItem value={mineCount} name="تعداد معادن" /> */}

                  <ElementDetailItem value={exportValue} name="میزان صادرات" />

                  <ElementDetailItem value={importValue} name="تعداد واردات" />

                  <ElementDetailItem
                    value={secondaryProductionValue}
                    name="میزان تولید ثانویه"
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
