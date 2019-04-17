import React, { Component } from 'react';
import ImgButton from '../General/ImgButton';
import item4 from '../../images/menu-item-4.jpg';
import { SECONDARY_SOURCE } from '../../constants/routes';

export default class ElementDetailForWorld extends Component<Props> {
  render() {
    return (
      <div>
        <div className="text-center">
          <h4>جزییات منابع و ذخایر طلا در جهان</h4>
        </div>

        <div className="main-detail-line">
          <div className="detail-line">
            <div className="detail-line-content">
              <div className="detail-line-circle">
                <span>4200 تن</span>
              </div>
              <div className="inner-content">
                <h4 className="title">میزان منابع</h4>
              </div>
            </div>
          </div>

          <div className="detail-line">
            <div className="detail-line-content">
              <div className="detail-line-circle">
                <span>4200 تن</span>
              </div>
              <div className="inner-content">
                <h4 className="title">مجموع تولید سالانه</h4>
              </div>
            </div>
          </div>

          <div className="detail-line">
            <div className="detail-line-content">
              <div className="detail-line-circle">
                <span>4200 تن</span>
              </div>
              <div className="inner-content">
                <h4 className="title">مجموع مصرف سالانه</h4>
              </div>
            </div>
          </div>

          <div className="detail-line">
            <div className="detail-line-content">
              <div className="detail-line-circle">
                <span>4200 تن</span>
              </div>
              <div className="inner-content">
                <h4 className="title">تعداد معادن</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE}
              src={item4}
              title="منابع ثانویه"
            />
          </div>

          <div className="col-sm-4">
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE}
              src={item4}
              title="صنایع پایین دستی"
            />
          </div>

          <div className="col-sm-4">
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE}
              src={item4}
              title="محیط زیستی"
            />
          </div>

          <div className="col-sm-4">
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE}
              src={item4}
              title="فهرست معادن"
            />
          </div>

          <div className="col-sm-4">
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE}
              src={item4}
              title="فهرست منابع"
            />
          </div>

          <div className="col-sm-4">
            <ImgButton
              className="main-detail-btn-wrap text-center"
              link={SECONDARY_SOURCE}
              src={item4}
              title="شرکتهای تولید کننده"
            />
          </div>
        </div>
      </div>
    );
  }
}
