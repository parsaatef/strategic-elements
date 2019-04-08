// @flow
import React, { Component } from 'react';
import {
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  Row,
  Col
} from 'react-bootstrap';
import Select from './Select';

const { Control } = Form;

const MapOptions = [
  { value: 'Filter', label: 'Filter' },
  { value: 'Filter1', label: 'Filter1' },
  { value: 'Filter2', label: 'Filter2' }
];

export default class Table extends Component<Props> {
  render() {
    return (
      <>
        <Row className="tb-filter-wrap">
          <Col sm={4}>
            <Row>
              <Col sm={8}>
                <Select options={MapOptions} placeholder="Filter-1" />
              </Col>
              <Col className="tb-btn-wrap" sm={4}>
                <Button className="tb-btn-wrap" type="submit">
                  Apply
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <Row>
              <Col sm={8}>
                <Select options={MapOptions} placeholder="Filter-2" />
              </Col>
              <Col className="tb-btn-wrap" sm={4}>
                <Button className="tb-btn-wrap" type="submit">
                  Apply
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm={3}>
            <Control type="text" placeholder="Search..." />
          </Col>
        </Row>

        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th className="check-column">
                <Control type="checkbox" />
              </th>
              <th>Contact</th>
              <th>Contact</th>
              <th />
            </tr>
            <tr>
              <td className="check-column">
                <Control type="checkbox" />
              </td>
              <td>Alfreds</td>
              <td>Maria Anders</td>
              <td>
                <div className="tb-icons tb-edit-icon">
                  <OverlayTrigger
                    overlay={<Tooltip id="tb-edit-tooltip">Edit</Tooltip>}
                  >
                    <span className="tb-tooltip-btn">
                      <span className="fal fa-edit" />
                    </span>
                  </OverlayTrigger>
                </div>
                <div className="tb-icons tb-detail-icon">
                  <OverlayTrigger
                    overlay={<Tooltip id="tb-detail-tooltip">Detail</Tooltip>}
                  >
                    <span className="tb-tooltip-btn">
                      <span className="fal fa-file" />
                    </span>
                  </OverlayTrigger>
                </div>
                <div className="tb-icons tb-delete-icon">
                  <OverlayTrigger
                    overlay={<Tooltip id="tb-delete-tooltip">Delete</Tooltip>}
                  >
                    <span className="tb-tooltip-btn">
                      <span className="fal fa-trash" />
                    </span>
                  </OverlayTrigger>
                </div>
              </td>
            </tr>
            <tr>
              <td className="check-column">
                <Control type="checkbox" />
              </td>
              <td>Berglunds</td>
              <td>Christina Berglund</td>
              <td>Christina Berglund</td>
            </tr>
          </tbody>
        </table>

        <div className="smfp-pagination-wrapsmfp-pagination-wrap">
          <ul className="smfp-pagination">
            <li>
              <a href="#" className="prev">
                <i className="fa fa-chevron-right" />
                Previous
              </a>
            </li>
            <li>
              <a href="#">1</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>
              <a href="#">4</a>
            </li>
            <li>
              <a href="#" className="active">
                5
              </a>
            </li>
            <li>
              <a href="#">6</a>
            </li>
            <li>
              <a href="#">7</a>
            </li>
            <li>
              <a href="#" className="next">
                Next
                <i className="fa fa-chevron-left" />
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  }
}
