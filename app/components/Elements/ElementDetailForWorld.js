import React, { Component } from 'react';

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
          <div className="col-sm-4 main-detail-btn-wrap text-center">
            <a className="smfp-btn-img" href="">
              <img src="../../images/menu-item-4.jpg" alt="img" />
              <div className="title">منابع ثانویه</div>
            </a>
          </div>

          <div className="col-sm-4 main-detail-btn-wrap text-center">
            <a className="smfp-btn-img" href="">
              <img src="../../images/menu-item-4.jpg" alt="img" />
              <div className="title">صنایع پایین دستی</div>
            </a>
          </div>

          <div className="col-sm-4 main-detail-btn-wrap text-center">
            <a className="smfp-btn-img" href="">
              <img src="../../images/menu-item-4.jpg" alt="img" />
              <div className="title">محیط زیستی</div>
            </a>
          </div>

          <div className="col-sm-4 main-detail-btn-wrap text-center">
            <a className="smfp-btn-img" href="">
              <img src="../../images/menu-item-4.jpg" alt="img" />
              <div className="title">فهرست معادن</div>
            </a>
          </div>

          <div className="col-sm-4 main-detail-btn-wrap text-center">
            <a className="smfp-btn-img" href="">
              <img src="../../images/menu-item-4.jpg" alt="img" />
              <div className="title">فهرست منابع</div>
            </a>
          </div>

          <div className="col-sm-4 main-detail-btn-wrap text-center">
            <a className="smfp-btn-img" href="">
              <img src="../../images/menu-item-4.jpg" alt="img" />
              <div className="title">شرکتهای تولید کننده</div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
