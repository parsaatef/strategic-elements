import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Button, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { addStaticVariables } from '../../utils/utility';

const { Header, Title, Body, Footer } = Modal;

class DetailAction extends Component<Props> {
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
    const { id, query, titleCol } = this.props;
    const { item } = query;

    let variables = { id };

    variables = addStaticVariables(item, variables);

    return (
      <Query query={item.gql} variables={variables}>
        {({ data, loading, error }) => {
          console.log('----data-----', data, loading, error);
          return (
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
                    {data && data[item.func] && data[item.func][titleCol]
                      ? data[item.func][titleCol]
                      : ''}
                  </Title>
                </Header>
                <Body>
                  {data && data[item.func] && (
                    <table className="table table-striped table-bordered">
                      <tbody>
                        {Object.keys(data[item.func]).map(feature => (
                          <tr key={feature}>
                            <td>{feature}</td>
                            <td>{data[item.func][feature]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </Body>
                <Footer>
                  <Button onClick={this.handleHide}>Close</Button>
                </Footer>
              </Modal>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default DetailAction;
