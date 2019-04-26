import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Query } from 'react-apollo';
import {
  INFORMATION_WORLD_DETAIL,
  INFORMATION_IRAN_DETAIL
} from '../../constants/routes';
import ImgButton from '../General/ImgButton';
import item4 from '../../images/menu-item-4.jpg';
import PageHeading from '../General/PageHeading';
import { GET_ELEMENT_BY_NAME } from '../../queries/element';

class InformationOfElement extends Component<Props> {
  render() {
    const { match } = this.props;

    const { element } = match.params;
    alert(element);

    return (
      <div>
        <PageHeading className="text-center" title="عنصر طلا" />

        <Query
          query={GET_ELEMENT_BY_NAME}
          variables={{
            element
          }}
        >
          {({ data, loading, error, refetch }) => {
            if (loading) return 'loading.....';

            console.log('data, error, refetch', data, error, refetch);

            return (
              <>
                {data && data.elementByName && (
                  <table className="table table-with-width table-striped table-bordered">
                    <tbody>
                      {Object.keys(data.elementByName).map(feature => (
                        <tr key={feature}>
                          <td>{feature}</td>
                          <td>{data.elementByName[feature]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            );
          }}
        </Query>

        <Row>
          <Col sm={6}>
            <ImgButton
              className="main-detail-btn-wrap text-left"
              link={INFORMATION_WORLD_DETAIL.replace(':element', element)}
              src={item4}
              title="جزییات برای جهان"
            />
          </Col>

          <Col sm={6}>
            <ImgButton
              className="main-detail-btn-wrap text-right"
              link={INFORMATION_IRAN_DETAIL.replace(':element', element)}
              src={item4}
              title="جزییات برای ایران"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default InformationOfElement;
