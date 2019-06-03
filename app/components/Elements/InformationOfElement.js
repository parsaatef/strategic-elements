import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Query } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import { INFORMATION_STATS_DETAIL } from '../../constants/routes';
import IconButton from '../General/IconButton';
import { GET_ELEMENT_BY_NAME } from '../../queries/element';
import PageHeadingIcon from '../General/PageHeadingIcon';
import Loading from '../General/Loading';

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
            if (loading) return <Loading />;

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
                            <tr
                              key={feature}
                              className="animated fadeInUp faster animation-auto-delay"
                            >
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
                        <IconButton
                          className="main-detail-btn-wrap text-left animated fadeInUp fast"
                          link={INFORMATION_STATS_DETAIL.replace(
                            ':type',
                            'world'
                          )
                            .replace(':element', element)
                            .replace(':title', data.elementByName.elementTitle)}
                          icon="smfpIcon smfpIcon-world"
                          title="جزییات برای جهان"
                        />
                      </Col>

                      <Col sm={6}>
                        <IconButton
                          className="main-detail-btn-wrap text-right animated fadeInUp fast"
                          link={INFORMATION_STATS_DETAIL.replace(
                            ':type',
                            'iran'
                          )
                            .replace(':element', element)
                            .replace(':title', data.elementByName.elementTitle)}
                          icon="smfpIcon smfpIcon-iran"
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
