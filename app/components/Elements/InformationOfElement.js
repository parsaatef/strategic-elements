import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ELEMENT_DETAIL_FOR_WORLD } from '../../constants/routes';
import ImgButton from '../General/ImgButton';
import item4 from '../../images/menu-item-4.jpg';
import HeadingOfPage from '../General/HeadingOfPage';

export default class InformationOfElement extends Component<Props> {
  render() {
    return (
      <div>
        <HeadingOfPage className="text-center" title="عنصر طلا" />

        <table className="table table-with-width table-striped table-bordered">
          <tbody>
            <tr>
              <th>Company</th>
              <th>Contact</th>
            </tr>
            <tr>
              <td>Alfreds</td>
              <td>Maria Anders</td>
            </tr>
            <tr>
              <td>Berglunds</td>
              <td>Christina Berglund</td>
            </tr>
            <tr>
              <td>Centro</td>
              <td>Francisco Chang</td>
            </tr>
            <tr>
              <td>Ernst Handel</td>
              <td>Roland Mendel</td>
            </tr>
          </tbody>
        </table>

        <Row>
          <Col sm={6}>
            <ImgButton
              className="main-detail-btn-wrap text-left"
              link={ELEMENT_DETAIL_FOR_WORLD}
              src={item4}
              title="جزییات برای جهان"
            />
          </Col>

          <Col sm={6}>
            <ImgButton
              className="main-detail-btn-wrap text-right"
              link={ELEMENT_DETAIL_FOR_WORLD}
              src={item4}
              title="جزییات برای ایران"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
