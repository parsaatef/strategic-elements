import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ImgButton from '../General/ImgButton';
import item4 from '../../images/menu-item-4.jpg';
import { SECONDARY_SOURCE } from '../../constants/routes';
import ElementDetailItem from './ElementDetailItem';
import PageHeading from '../General/PageHeading';

export default class ElementDetailForWorld extends Component<Props> {
  render() {
    return (
      <div>
        <PageHeading
          className="text-center"
          title="جزییات منابع و ذخایر طلا در جهان"
        />

        <div className="main-detail-line">
          <ElementDetailItem value="4200 تن" name="میزان منابع" />

          <ElementDetailItem value="4200 تن" name="مجموع تولید سالانه" />

          <ElementDetailItem value="4200 تن" name="مجموع مصرف سالانه" />

          <ElementDetailItem value="4200 تن" name="تعداد معادن" />
        </div>

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
