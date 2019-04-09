// @flow
import React, { Component } from 'react';
import {
  Form,
  ButtonToolbar,
  ButtonGroup,
  Button,
  OverlayTrigger,
  Tooltip,
  Modal,
  Row,
  Col
} from 'react-bootstrap';
import Select from './Select';

const { Control } = Form;
const { Header, Title, Body, Footer } = Modal;

const MapOptions = [
  { value: 'Filter', label: 'Filter' },
  { value: 'Filter1', label: 'Filter1' },
  { value: 'Filter2', label: 'Filter2' }
];

export default class Table extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    };

    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };
  }

  render() {
    const { show } = this.state;

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
                    <Button
                      className="tb-tooltip-btn"
                      variant="link"
                      onClick={this.handleShow}
                    >
                      <span className="fal fa-file" />
                    </Button>
                  </OverlayTrigger>

                  <Modal
                    show={show}
                    onHide={this.handleHide}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Header closeButton>
                      <Title id="contained-modal-title-vcenter">
                        Modal heading
                      </Title>
                    </Header>
                    <Body>
                      <h4>Centered Modal</h4>
                      <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras
                        justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at
                        eros.
                      </p>
                    </Body>
                    <Footer>
                      <Button onClick={this.handleHide}>Close</Button>
                    </Footer>
                  </Modal>
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

        <div className="smfp-pagination-wrap">
          <div className="smfp-pagination">
            <ButtonToolbar aria-label="Toolbar with button groups">
              <ButtonGroup className="mr-2" aria-label="First group">
                <Button className="prev">
                  <i className="fa fa-chevron-right" />
                </Button>
                <Button>1</Button>
                <Button>2</Button>
                <Button className="active">3</Button>
                <Button>4</Button>
                <Button className="next">
                  <i className="fa fa-chevron-left" />
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </div>
      </>
    );
  }
}
