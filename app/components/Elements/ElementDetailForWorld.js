import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Query } from 'react-apollo';
import ImgButton from '../General/ImgButton';
import item4 from '../../images/menu-item-4.jpg';
import {
  SECONDARY_SOURCE,
  UPSTREAM_INDUSTRY,
  ENVIRONMENT,
  THREAT,
  TECHNOLOGICAL_LEVEL,
  DEPENDENCE_INDUSTRIES,
  MINE,
  MINERAL,
  GLOBAL_PRICE
} from '../../constants/routes';
import ElementDetailItem from './ElementDetailItem';
import PageHeading from '../General/PageHeading';
import { GET_ELEMENTS_STATS } from '../../queries/elementStats';
import { getYearOptions, getCountries, getStates } from '../../utils/utility';
import Select from '../General/Select';

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
        <PageHeading className="text-center" title={heading} />

        <div className="filters">
          <Row>
            <Col sm={3} xs={6} className="animated flipInX faster" />

            <Col sm={3} xs={6} className="animated flipInX fast">
              <Select
                options={yearOptions}
                placeholder="انتخاب سال"
                onChange={this.changeOptions.bind(this, 'year')}
                defaultValue={year}
              />
            </Col>

            <Col sm={3} xs={6} className="animated flipInX slow">
              <Select
                options={locationOptions}
                placeholder={type === 'world' ? 'انتخاب کشور' : 'انتخاب استان'}
                onChange={this.changeOptions.bind(this, 'location')}
                defaultValue={location}
              />
            </Col>

            <Col sm={3} xs={6} className="animated flipInX slower" />
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
            if (loading) return 'loading.....';

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
                mineCount,
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

                  <ElementDetailItem value={mineCount} name="تعداد معادن" />

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
          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE.replace(':element', element).replace(
                ':title',
                title
              )}
              src={item4}
              title="منابع ثانویه"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={UPSTREAM_INDUSTRY.replace(':element', element).replace(
                ':title',
                title
              )}
              src={item4}
              title="صنایع پایین دستی"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={ENVIRONMENT.replace(':element', element).replace(
                ':title',
                title
              )}
              src={item4}
              title="محیط زیستی"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={MINE.replace(':element', element).replace(':title', title)}
              src={item4}
              title="فهرست معادن"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={DEPENDENCE_INDUSTRIES.replace(':element', element).replace(
                ':title',
                title
              )}
              src={item4}
              title="صنایع وابسته"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={TECHNOLOGICAL_LEVEL.replace(':element', element).replace(
                ':title',
                title
              )}
              src={item4}
              title="سطح تکنولوژی"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={MINERAL.replace(':element', element).replace(
                ':title',
                title
              )}
              src={item4}
              title="فهرست کانی ها"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={THREAT.replace(':element', element).replace(
                ':title',
                title
              )}
              src={item4}
              title="تهدیدات"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={GLOBAL_PRICE.replace(':element', element).replace(
                ':title',
                title
              )}
              src={item4}
              title="قیمت جهانی"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
