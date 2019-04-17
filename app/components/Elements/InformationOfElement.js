import React, { Component } from 'react';
import { ELEMENT_DETAIL_FOR_WORLD } from '../../constants/routes';
import ImgButton from '../General/ImgButton';
import item4 from '../../images/menu-item-4.jpg';

export default class InformationOfElement extends Component<Props> {
  render() {
    return (
      <div>
        <div className="text-center">
          <h4>عنصر طلا</h4>
        </div>

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
            <tr>
              <td>Island Trading</td>
              <td>Helen Bennett</td>
            </tr>
            <tr>
              <td>Königlich</td>
              <td>Philip Cramer</td>
            </tr>
            <tr>
              <td>Laughing</td>
              <td>Yoshi Tannamuri</td>
            </tr>
            <tr>
              <td>Magazzini</td>
              <td>Giovanni Rovelli</td>
            </tr>
            <tr>
              <td>Paris</td>
              <td>Marie Bertrand</td>
            </tr>
            <tr>
              <td>Island Trading</td>
              <td>Helen Bennett</td>
            </tr>
            <tr>
              <td>Königlich</td>
              <td>Philip Cramer</td>
            </tr>
            <tr>
              <td>Laughing</td>
              <td>Yoshi Tannamuri</td>
            </tr>
            <tr>
              <td>Magazzini</td>
              <td>Giovanni Rovelli</td>
            </tr>
            <tr>
              <td>North/South</td>
              <td>Simon Crowther</td>
            </tr>
            <tr>
              <td>Paris</td>
              <td>Marie Bertrand</td>
            </tr>
          </tbody>
        </table>

        <div className="row">
          <div className="col-sm-6">
            <ImgButton
              className="main-detail-btn-wrap text-left"
              link={ELEMENT_DETAIL_FOR_WORLD}
              src={item4}
              title="جزییات برای جهان"
            />
          </div>

          <div className="col-sm-6">
            <ImgButton
              className="main-detail-btn-wrap text-right"
              link={ELEMENT_DETAIL_FOR_WORLD}
              src={item4}
              title="جزییات برای ایران"
            />
          </div>
        </div>
      </div>
    );
  }
}
