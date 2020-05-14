import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import _ from 'underscore';
import { Button, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { addStaticVariables, FormattedSimpleMsg } from '../../utils/utility';

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
    const {
      id,
      query,
      titleCol,
      type,
      itemsDetail,
      itemsDetailLabels
    } = this.props;
    const { item } = query;

    let variables = { id };

    variables = addStaticVariables(item, variables);

    return (
      <Query query={item.gql} variables={variables}>
        {({ data, loading, error }) => {
          // console.log('----data-----', data, loading, error);
          if (loading) return <div>loading...</div>;
          if (error) {
            console.error(error);
            return null;
          }
          return (
            <div
              className={
                type === 'icon' ? 'tb-icons tb-detail-icon' : 'item-link-detail'
              }
            >
              {type === 'icon' ? (
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tb-detail-tooltip">
                      <FormattedMessage id="global.detail" />
                    </Tooltip>
                  }
                >
                  <Button
                    className="tb-tooltip-btn"
                    variant="link"
                    onClick={this.handleShow}
                  >
                    <span className="smfpIcon smfpIcon-details" />
                  </Button>
                </OverlayTrigger>
              ) : (
                <a
                  onKeyUp={e => console.log('--e--', e)}
                  tabIndex="-1"
                  role="menuitem"
                  onClick={e => {
                    e.preventDefault();
                    this.handleShow();
                  }}
                >
                  {data && data[item.func] && data[item.func][titleCol]
                    ? data[item.func][titleCol]
                    : ''}
                </a>
              )}

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
                        {Object.keys(data[item.func]).map(feature => {
                          if (['__typename', 'id'].includes(feature)) {
                            return null;
                          }

                          let value = data[item.func][feature];

                          value =
                            value || value === 0 || value === false
                              ? value
                              : '-';

                          return (
                            <tr key={feature}>
                              <td>
                                {itemsDetailLabels &&
                                !_.isUndefined(itemsDetailLabels[feature]) ? (
                                  itemsDetailLabels[feature]
                                ) : (
                                  <FormattedSimpleMsg
                                    id={`global.${feature}`}
                                  />
                                )}
                              </td>
                              <td>
                                {itemsDetail &&
                                !_.isUndefined(itemsDetail[feature])
                                  ? itemsDetail[feature](data[item.func], value)
                                  : value}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </Body>
                <Footer>
                  <Button onClick={this.handleHide}>
                    <FormattedMessage id="global.close" />
                  </Button>
                </Footer>
              </Modal>
            </div>
          );
        }}
      </Query>
    );
  }
}

DetailAction.defaultProps = {
  type: 'icon'
};

export default DetailAction;
