import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Query } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import { INFORMATION_STATS_DETAIL } from '../../constants/routes';
import ImgButton from '../General/ImgButton';
import item4 from '../../images/menu-item-4.jpg';
import { GET_ELEMENT_BY_NAME } from '../../queries/element';
import PageHeadingIcon from '../General/PageHeadingIcon';

const notNeedFeaturesForDisplay = [
  'id',
  'description',
  'relatedIndustryDesc',
  'technologyLevelDesc',
  'lowLevelIndustryDesc',
  'threatyDesc',
  'secondaryResourcesDesc',
  'ecologyDesc',
  'username',
  '__typename'
];

class InformationOfElement extends Component<Props> {
  render() {
    const { match } = this.props;

    const { element } = match.params;

    return (
      <div>
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
                  <>
                    <PageHeadingIcon
                      icon="smfpIcon smfpIcon-element"
                      title={`عنصر ${data.elementByName.elementTitle}`}
                    />

                    <table className="table table-with-width table-striped table-bordered">
                      <tbody>
                        {Object.keys(data.elementByName)
                          .filter(
                            feature =>
                              !notNeedFeaturesForDisplay.includes(feature)
                          )
                          .map(feature => (
                            <tr key={feature}>
                              <td>
                                <FormattedMessage id={`global.${feature}`} />
                              </td>
                              <td>{data.elementByName[feature]}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <Row>
                      <Col sm={6}>
                        <ImgButton
                          className="main-detail-btn-wrap text-left"
                          link={INFORMATION_STATS_DETAIL.replace(
                            ':type',
                            'world'
                          )
                            .replace(':element', element)
                            .replace(':title', data.elementByName.elementTitle)}
                          src={item4}
                          title="جزییات برای جهان"
                        />
                      </Col>

                      <Col sm={6}>
                        <ImgButton
                          className="main-detail-btn-wrap text-right"
                          link={INFORMATION_STATS_DETAIL.replace(
                            ':type',
                            'iran'
                          )
                            .replace(':element', element)
                            .replace(':title', data.elementByName.elementTitle)}
                          src={item4}
                          title="جزییات برای ایران"
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default InformationOfElement;
