import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Query } from 'react-apollo';
import ImgButton from '../General/ImgButton';
import item4 from '../../images/menu-item-4.jpg';
import { SECONDARY_SOURCE } from '../../constants/routes';
import ElementDetailItem from './ElementDetailItem';
import PageHeading from '../General/PageHeading';
import { GET_ELEMENTS_STATS } from '../../queries/elementStats';

export default class ElementDetailForWorld extends Component<Props> {
  render() {
    const { match } = this.props;

    const { element } = match.params;

    return (
      <div>
        <PageHeading
          className="text-center"
          title="جزییات منابع و ذخایر طلا در جهان"
        />

        <Query
          query={GET_ELEMENTS_STATS}
          variables={{
            locationType: 'world',
            location: '',
            year: 2019,
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

                  <ElementDetailItem value={exportValue} name="تعداد معادن" />

                  <ElementDetailItem value={importValue} name="تعداد معادن" />

                  <ElementDetailItem
                    value={secondaryProductionValue}
                    name="تعداد معادن"
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
              link={SECONDARY_SOURCE}
              src={item4}
              title="منابع ثانویه"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE}
              src={item4}
              title="صنایع پایین دستی"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE}
              src={item4}
              title="محیط زیستی"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE}
              src={item4}
              title="فهرست معادن"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE}
              src={item4}
              title="فهرست منابع"
            />
          </Col>

          <Col sm={4}>
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE}
              src={item4}
              title="شرکتهای تولید کننده"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
